import React from 'react';
import Image from 'next/image';
import { Format } from '@/types/youtube';
type Props = {
  format: Format | undefined;
  toggleFormatList: (e: any) => void;
};

const SelectedFormat: React.FC<Props> = ({ format, toggleFormatList }) => {
  return (
    <div className="p-[1px] cursor-pointer bg-gradient-to-b from-[rgba(108,123,138,1)] to-[rgba(121,121,121,0.2)] rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div onClick={(e) => toggleFormatList(e)} className="py-2.5 rounded-lg bg-dark flex items-center justify-center px-5 space-x-3 select-none">
        {format ? (
          <>
            {format.resolution ? (
              <svg className="text-radical-red-500 group-hover:text-white transition duration-300 ease-out-expo" width="18" height="16" viewBox="0 0 178 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M133.192 0H44.3974C17.759 0 0 17.759 0 44.3974V97.6743C0 124.313 17.759 142.072 44.3974 142.072H133.192C159.831 142.072 177.59 124.313 177.59 97.6743V44.3974C177.59 17.759 159.831 0 133.192 0ZM105.577 80.1818L83.6448 93.3234C74.7653 98.6511 67.4839 94.5665 67.4839 84.1775V57.8055C67.4839 47.4165 74.7653 43.332 83.6448 48.6597L105.577 61.8012C114.013 66.9513 114.013 75.1204 105.577 80.1818Z" fill="currentColor" />
              </svg>
            ) : (
              <Image height={22} width={22} src="./music.svg" alt="audio-only" />
            )}
            <p className="text-sm">
              {format.resolution} {format.ext.toUpperCase()} ({format.size}){' '}
            </p>
            {format.audio_channels == null && (
              <span className="text-radical-red-500 group-hover:text-white transition duration-300 ease-out-expo">
                <svg width="18" height="14" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.8651 11.619L20.1032 6.38095M14.8651 6.38095L20.1032 11.619M9.62699 1.66666V16.3333L5.43651 12.1429H2.29365C2.01581 12.1429 1.74934 12.0325 1.55287 11.836C1.35641 11.6396 1.24603 11.3731 1.24603 11.0952V6.90476C1.24603 6.62692 1.35641 6.36045 1.55287 6.16398C1.74934 5.96752 2.01581 5.85714 2.29365 5.85714H5.43651L9.62699 1.66666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default SelectedFormat;
