const convertBytes = (value: number | string): string => {
  const bytes = parseInt(value.toString());
  const kilobyte: number = 1024;
  const megabyte: number = kilobyte * 1024;
  const gigabyte: number = megabyte * 1024;

  if (bytes >= gigabyte) {
    return (bytes / gigabyte).toFixed(2) + ' GB';
  } else if (bytes >= megabyte) {
    return (bytes / megabyte).toFixed(2) + ' MB';
  } else if (bytes >= kilobyte) {
    return (bytes / kilobyte).toFixed(2) + ' KB';
  } else {
    return bytes + ' bytes';
  }
};
const normalizeYouTubeUrl = (raw_url: string): string | null => {
  let url = raw_url.replace('https://www.youtube.com/shorts/', 'https://youtube.com/shorts/');
  url = url.replace('https://m.youtube.com/', 'https://www.youtube.com/');
  const youtubeBaseUrl = 'https://www.youtube.com/';
  const youtubeShortUrl = 'https://youtu.be/';
  const youtubeShortsUrl = 'https://youtube.com/shorts/';

  let videoId = '';
  if (url.startsWith(youtubeBaseUrl)) {
    const match = url.match(/[?&]v=([^&]+)/);
    if (match) {
      videoId = match[1];
    } else {
      return null;
    }
  } else if (url.startsWith(youtubeShortUrl)) {
    const videoIdMatch = url.match(/youtu\.be\/([^?]+)/);
    if (videoIdMatch) {
      videoId = videoIdMatch[1];
    } else {
      return null;
    }
  } else if (url.startsWith(youtubeShortsUrl)) {
    const videoIdMatch = url.match(/youtube\.com\/shorts\/([^?]+)/);
    if (videoIdMatch) {
      videoId = videoIdMatch[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
  return `https://www.youtube.com/watch?v=${videoId}`;
};

const getDuration = (start_time: string, end_time: string): string => {
  const start = new Date(`1970-01-01T${start_time}`);
  const end = new Date(`1970-01-01T${end_time}`);
  const duration = Math.abs(end.getTime() - start.getTime());

  const hours = Math.floor(duration / (1000 * 60 * 60))
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((duration / 1000) % 60)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export { convertBytes, getDuration, normalizeYouTubeUrl };
