'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { raleway } from '@/utils/fonts';
import { useCallback, useEffect, useState } from 'react';
import URLInput from '@/components/URLInput';
import Thumbnail from '@/components/Thumbnail';
import VideoTitle from '@/components/VideoTitle';
import ThumbnailURL from '@/components/ThumbnailURL';
import FormatSelect from '@/components/FormatSelect';
import VideoDuration from '@/components/VideoDuration';
import type { VideoInfo, Format } from '@/types/youtube';
import GetLinkButton from '@/components/buttons/GenerateButton';
import DownloadButton from '@/components/buttons/DownloadButton';
import SelectedFormat from '@/components/SelectedFormat';
import PortionCutOutput from '@/components/PortionCutOutput';
import StartInput from '@/components/StartInput';
import EndInput from '@/components/EndInput';
import Image from 'next/image';
import MergeCommand from '@/components/MergeCommand';
import AudioCheckbox from '@/components/AudioCheckbox';
import Label from '@/components/Label';
import DelayInput from '@/components/DelayInput';
import { getDuration, normalizeYouTubeUrl } from '@/utils/helpers';

export default function Home() {
  const [videoData, setVideoData] = useState<VideoInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formats, setFormats] = useState<Format[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<Format>();
  const [url, setURL] = useState<string>('');
  const [portionCutCommand, setPortionCutCommand] = useState<string>('');
  const [merge_command, setMergeCommand] = useState<string>('');
  const [start_time, setStartTime] = useState<string>('');
  const [end_time, setEndTime] = useState<string>('');
  const [delay, setDelay] = useState<number>(30);
  const [withAudio, setWithAudio] = useState<boolean>(true);
  const [videoIsLive, setVideoIsLive] = useState<boolean>(false);
  const fetchInfo = useCallback(async (normalizeYouTubeUrl: string | null) => {
    if (!normalizeYouTubeUrl) {
      return;
    }
    setVideoData(() => undefined);
    setSelectedFormat(() => undefined);
    setPortionCutCommand(() => '');
    setStartTime(() => '');
    setEndTime(() => '');
    setLoading(() => true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: normalizeYouTubeUrl }),
    };
    await fetch(`http://localhost:3000/api/youtube/info`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          toast.error('Something went wrong!', {
            theme: 'dark',
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
        if (!response.formats.length) {
          setVideoIsLive(() => true);
        } else {
          setVideoIsLive(() => false);
        }
        setVideoData(() => response);
      });
    setLoading(() => false);
  }, []);
  const toggleAudio = () => {
    if (!selectedFormat?.resolution && selectedFormat?.audio_channels) {
      setWithAudio(() => true);
    } else {
      setWithAudio((prev) => !prev);
    }
  };
  const handleSelected = (e: any, format: Format) => {
    setSelectedFormat(format);
    setWithAudio(() => (format.audio_channels ? true : false));
    if (videoData) {
      if (format.ext === 'webm') {
        setMergeCommand(() => `ffmpeg -i "${format.url}" -i "${videoData.best_audio?.url}" -map 0:v -map 1:a -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${videoData.title}.${format.ext}"`);
      } else {
        setMergeCommand(() => `ffmpeg -i "${format.url}" -i "${videoData.best_audio?.url}" -map 0:v -map 1:a -c:v libx264 -c:a aac "${videoData.title}.${format.ext}"`);
      }
    }
    const liElements = document.querySelectorAll('li');
    liElements.forEach((li) => {
      li.classList.remove('active');
    });
    const element = e.target as HTMLElement;
    const parentLi = element.closest('li');
    if (parentLi) {
      parentLi.classList.add('active');
    }
    toggleFormatList(e);
  };
  const handleDownload = async () => {
    window.open(`/api/youtube/download?url=${encodeURIComponent(selectedFormat?.url || '')}&file_name=${encodeURIComponent(videoData?.title + '.' + selectedFormat?.ext)}&ext=${selectedFormat?.ext}&audio_only=${selectedFormat?.height ? false : true}`, '_blank');
  };

  const toggleFormatList = (e: any) => {
    const format_list = document.getElementById('format_list');
    if (format_list) {
      format_list.classList.toggle('hidden');
    }
    e.stopPropagation();
  };
  const handleClickOutside = (event: any) => {
    const format_list = document.getElementById('format_list');
    if (format_list) {
      format_list.classList.add('hidden');
    }
    event.stopPropagation();
  };
  const formatTime = useCallback(
    (time: string, type: string = ''): string => {
      const parts = time.split(':');
      let hours = '00';
      let minutes = '00';
      let seconds = '00';

      if (parts.length > 0) {
        seconds = parts.pop() || '00';
      }
      if (parts.length > 0) {
        minutes = parts.pop() || '00';
      }
      if (parts.length > 0) {
        hours = parts.pop() || '00';
      }
      if (type === 'S') {
        const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        if (totalSeconds > 30) {
          const updatedTotalSeconds = totalSeconds - delay;
          hours = Math.floor(updatedTotalSeconds / 3600)
            .toString()
            .padStart(2, '0');
          minutes = Math.floor((updatedTotalSeconds % 3600) / 60)
            .toString()
            .padStart(2, '0');
          seconds = (updatedTotalSeconds % 60).toString().padStart(2, '0');
        }
      }
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    },
    [delay]
  );
  const submitURL = (url: string): boolean => {
    if (!url) {
      return false;
    }
    if (normalizeYouTubeUrl(url)) {
      fetchInfo(normalizeYouTubeUrl(url));
      return true;
    }
    return false;
  };
  const handleURLChange = (url: string): void => {
    setURL(() => url);
    submitURL(url);
  };
  const handleFetch = (): void => {
    if (!submitURL(url)) {
      if (url.includes('youtube.com')) {
        toast.error('Invalid YouTube Video URL!', {
          theme: 'dark',
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleClickOutside);
    }
    if (start_time || end_time) {
      if (start_time && end_time) {
        const formattedStartTime: string = formatTime(start_time, 'S');
        const formattedEndTime: string = formatTime(end_time);
        const duration: string = getDuration(formattedStartTime, formattedEndTime);
        if (withAudio) {
          if (selectedFormat?.ext === 'webm') {
            setPortionCutCommand(() => `ffmpeg -ss ${formattedStartTime} -i "${selectedFormat?.url}" -ss ${formattedStartTime} -i "${videoData?.best_audio?.url}" -ss ${delay} -t ${duration} -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${videoData?.title}_clipped_${formattedStartTime.replace(/:/g, '-')}_to_${formattedEndTime.replace(/:/g, '-')}.${selectedFormat.ext}"`);
          } else {
            setPortionCutCommand(() => `ffmpeg -ss ${formattedStartTime} -i "${selectedFormat?.url}" -ss ${formattedStartTime} -i "${videoData?.best_audio?.url}" -ss ${delay} -t ${duration} -c:v libx264 -c:a aac "${videoData?.title}_clipped_${formattedStartTime.replace(/:/g, '-')}_to_${formattedEndTime.replace(/:/g, '-')}.${selectedFormat?.ext}"`);
          }
        } else {
          if (selectedFormat?.ext === 'webm') {
            setPortionCutCommand(() => `ffmpeg -ss ${formattedStartTime} -i "${selectedFormat?.url}" -ss ${delay} -t ${duration} -an -c:v libvpx-vp9 -crf 30 -b:v 0 "${videoData?.title}_clipped_${formattedStartTime.replace(/:/g, '-')}_to_${formattedEndTime.replace(/:/g, '-')}.${selectedFormat.ext}"`);
          } else {
            setPortionCutCommand(() => `ffmpeg -ss ${formattedStartTime} -i "${selectedFormat?.url}" -ss ${delay} -t ${duration} -an -c:v libx264 "${videoData?.title}_clipped_${formattedStartTime.replace(/:/g, '-')}_to_${formattedEndTime.replace(/:/g, '-')}.mp4"`);
          }
        }
      }
    } else {
      if (videoData) {
        if (!selectedFormat) {
          if (videoData.formats.length) {
            setFormats(() => videoData.formats);
            setSelectedFormat(() => videoData.formats[0]);
            setWithAudio(() => (videoData.formats[0].audio_channels ? true : false));
          }
        }
        if (selectedFormat) {
          if (selectedFormat.ext === 'webm') {
            setMergeCommand(() => `ffmpeg -i "${selectedFormat.url}" -i "${videoData.best_audio?.url}" -map 0:v -map 1:a -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${videoData.title}.${selectedFormat.ext}"`);
          } else {
            setMergeCommand(() => `ffmpeg -i "${selectedFormat.url}" -i "${videoData.best_audio?.url}" -map 0:v -map 1:a -c:v libx264 -c:a aac "${videoData.title}.${selectedFormat.ext}"`);
          }
        }
      }
      if (videoData === undefined) {
        setFormats(() => []);
        setVideoData(() => undefined);
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('click', handleClickOutside);
      }
    };
  }, [videoData, selectedFormat, start_time, end_time, withAudio, delay, formatTime, url]);
  return (
    <>
      <div className="absolute top-0 left-0 flex justify-center w-full bg-[#213B53] -z-[1]">
        <div className="bg-radial-gradient w-full h-[468px]"></div>
      </div>
      <main className="relative">
        <h2 className={`${raleway.className} text-4xl font-medium text-center`}>Download YouTube Video Online</h2>
        <p className={`${raleway.className} text-center font-medium text-center text-lg mt-5`}>Download YouTube video 1080p, 4k, 8k on iPhone Android</p>
        <div className="grid grid-cols-12 gap-x-5 mt-14">
          <URLInput handleURLChange={handleURLChange} />
          <GetLinkButton loading={loading} handleFetch={handleFetch} />
        </div>
        {videoData && (
          <div className="grid grid-cols-5 gap-8 mt-14">
            <div className="col-span-2">
              <Thumbnail url={videoData.thumbnail} />
            </div>
            <div className="col-span-3 text-left">
              <div className="flex flex-col space-y-5">
                <VideoTitle title={videoData.title} />
                {formats.length && (
                  <div className="grid grid-cols-5 gap-x-5">
                    <div className="col-span-3 relative">
                      <SelectedFormat format={selectedFormat} toggleFormatList={toggleFormatList} />
                      <FormatSelect formats={formats} handleSelected={handleSelected} selectedFormat={selectedFormat} />
                    </div>
                    <div className="col-span-2">
                      <DownloadButton handleDownload={handleDownload} />
                    </div>
                  </div>
                )}
                <VideoDuration duration={videoData.duration_string} isLive={videoIsLive} />
                <ThumbnailURL url={videoData.thumbnail} />
              </div>
            </div>
            {!selectedFormat?.audio_channels && !videoIsLive && (
              <div className="col-span-5">
                <div className="flex space-x-2 items-center">
                  <h2 className={`${raleway.className} text-xl font-bold my-5`}>Audio Merge</h2>
                  <Image src="/merge.svg" alt="merge.svg" height={24} width={24} className="mt-0.5" />
                </div>
                <p className="text-sm">If selected format {"don't"} have audio, merge video + audio using ffmpeg command</p>
                <MergeCommand merge_command={merge_command} />
              </div>
            )}
            {!videoIsLive && (
              <div className="col-span-5">
                <div className="flex space-x-3">
                  <h2 className={`${raleway.className} text-xl font-bold my-5`}>Portion Cut</h2>
                  <Image src="/scissor.svg" alt="scissor.svg" height={32} width={32} />
                </div>
                <div className="flex space-x-3">
                  <StartInput setStartTime={setStartTime} />
                  <EndInput setEndTime={setEndTime} />
                  <DelayInput delay={delay} setDelay={setDelay} />
                  <AudioCheckbox value={withAudio} toggleAudio={toggleAudio} />
                  {selectedFormat?.resolution && (
                    <Label>
                      <div className="py-1 px-2 rounded-l-md bg-gradient-to-b from-[rgba(240,240,240,0.32)] to-[rgba(105,105,105,0.14)] text-sm select-none">Resolution</div>
                      <p className="text-sm">{selectedFormat?.resolution}</p>
                    </Label>
                  )}
                </div>
                {start_time && end_time && portionCutCommand && <PortionCutOutput code={portionCutCommand} />}
              </div>
            )}
          </div>
        )}
      </main>
      <ToastContainer />
    </>
  );
}
