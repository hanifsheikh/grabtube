import React from 'react';
import { raleway } from '@/utils/fonts';
import { isArabic } from '@/utils/lang';
type Props = {
  title: string;
};

const VideoTitle: React.FC<Props> = ({ title }) => {
  let text_direction = 'ltr';
  if (isArabic(title)) {
    text_direction = 'rtl';
  }
  return (
    <h4 dir={text_direction} className={`${raleway.className} text-lg font-semibold`}>
      {title}
    </h4>
  );
};
export default VideoTitle;
