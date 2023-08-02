import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pipelineAsync = promisify(pipeline);
export const config = {
  api: {
    responseLimit: false,
  },
};
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, file_name, ext, audio_only } = req.query;

  let content_type: string = '';

  if (audio_only === 'false') {
    switch (ext) {
      case 'mp4':
        content_type = 'video/mp4';
        break;
      case 'webm':
        content_type = 'video/webm';
        break;
      case 'mkv':
        content_type = 'video/x-matroska';
        break;
      case 'mpeg':
        content_type = 'video/mpeg';
        break;
      case 'ogg':
        content_type = 'video/ogg';
        break;
      case 'wmv':
        content_type = 'video/x-ms-wmv';
        break;
      case 'flv':
        content_type = 'video/x-flv';
        break;
      case 'avi':
        content_type = 'video/x-msvideo';
        break;
    }
  } else {
    switch (ext) {
      case 'mp3':
        content_type = 'audio/mpeg';
        break;
      case 'wav':
        content_type = 'audio/wav';
        break;
      case 'ogg':
        content_type = 'audio/ogg';
        break;
      case 'webm':
        content_type = 'audio/webm';
        break;
    }
  }

  if (content_type && url) {
    try {
      const response = await fetch(url.toString());

      const contentType = response.headers.get('content-type');
      const contentLength = response.headers.get('content-length');

      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file_name?.toString() || 'download' + '.' + ext)}"`);
      res.setHeader('Content-Type', contentType || '');
      res.setHeader('Content-Length', contentLength || '');

      await pipelineAsync(response.body || '', res);
      res.end();
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).end('Error downloading file');
    }
  } else {
    res.status(500).json('Something went wrong.');
  }
}
