import { convertBytes } from '@/utils/helpers';
import * as os from 'os';
import type { NextApiRequest, NextApiResponse } from 'next';
import { create as CreateYoutubeDL } from 'youtube-dl-exec';
import type { Format, VideoInfo, YtFormat } from '@/types/youtube';
import path from 'path';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const { url } = req.body;
    const isWindows: boolean = os.platform() === 'win32';    
    const ytDLPPath = isWindows ? './bin/yt-dlp.exe' : './bin/yt-dlp';   
    const youtubeDL = CreateYoutubeDL(ytDLPPath);
    const filterFormatNotes = ['storyboard', 'Default'];
    const videoData = await youtubeDL(url, {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    })
      .then((info: any): VideoInfo => {
        const preferredFormats: Format[] | never = [];
        const formats = info.formats
          .filter((format: YtFormat) => !filterFormatNotes.includes(format.format_note) && format.protocol == 'https')
          .map((format: YtFormat): Format => {
            return {
              format_id: format.format_id,
              ext: format.ext,
              audio_channels: format.audio_channels,
              quality: format.quality,
              fps: format.fps,
              height: format.height,
              size: convertBytes(format.filesize ? format.filesize : format.filesize_approx),
              resolution: format.height ? format.height + 'p' : null,
              url: format.url,
            };
          });
        formats.sort((a: Format, b: Format) => b.quality - a.quality);

        const best_audio: Format | null = formats.find((e: Format) => !e.resolution && e.audio_channels);
        return {
          video_id: info.id,
          title: info.title,
          duration_string: info.duration_string,
          thumbnail: info.thumbnail,
          formats,
          best_audio,
        };
      })
      .catch((e) => {
        res.status(500).json({ error: e });
      });
    res.status(200).json(videoData);
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' });
  }
}
