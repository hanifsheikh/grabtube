import React from 'react';
import Image from 'next/image';
import { raleway } from '@/utils/fonts';
type Props = {
  handleDownload: () => void;
};

const DownloadButton: React.FC<Props> = ({ handleDownload }) => {
  return (
    <button onClick={handleDownload} className={`${raleway.className} flex items-center justify-center py-2 space-x-2 w-40 px-5 bg-radical-red-500 text-base font-medium rounded-lg hover:bg-[#F84678] effect-button-sm transition duration-300 ease-out-expo`}>
      <Image className="flex -mt-1 w-auto" height={18} width={24} src="download.svg" alt="download" />
      <span className="flex">Download</span>
    </button>
  );
};
export default DownloadButton;
