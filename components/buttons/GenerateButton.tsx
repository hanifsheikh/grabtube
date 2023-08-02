import React from 'react';
import Image from 'next/image';
import { raleway } from '@/utils/fonts';
type Props = {
  loading: boolean;
  handleFetch: () => void;
};

const GenerateButton: React.FC<Props> = ({ loading, handleFetch }) => {
  return (
    <div className="col-span-3">
      <button disabled={loading} onClick={handleFetch} className={`${raleway.className} flex items-center justify-center space-x-2 h-12 px-4 w-full bg-radical-red-500 text-xl font-medium rounded-lg hover:bg-[#F84678] effect-button transition duration-300 ease-out-expo`}>
        {loading ? (
          <>
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white/50"></span>
            </span>
            <span className="flex">Generating...</span>
          </>
        ) : (
          <>
            <Image className="flex" height={32} width={32} src="link.svg" alt="link" />
            <span className="flex"> Generate </span>
          </>
        )}
      </button>
    </div>
  );
};
export default GenerateButton;
