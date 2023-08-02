export type YtFormat = {
  format_id: string;
  ext: string;
  filesize: number;
  filesize_approx: number;
  audio_channels: number;
  quality: number;
  fps: number;
  height: string;
  url: string;
  protocol: string;
  format_note: string;
};

export type Format = {
  format_id: number | string;
  ext: string;
  size: number | string;
  audio_channels: number | null;
  quality: number;
  fps: number | null;
  height: string | null;
  resolution: string | null;
  url: string;
};

export type VideoInfo =
  | {
      video_id: string;
      title: string;
      duration_string: string;
      thumbnail: string;
      formats: Format[];
      best_audio: Format | null;
    }
  | undefined;
