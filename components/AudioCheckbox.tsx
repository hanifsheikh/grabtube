import React, { useEffect } from 'react';
type Props = {
  value: boolean;
  toggleAudio: () => void;
};

const AudioCheckbox: React.FC<Props> = ({ value, toggleAudio }) => {
  useEffect(() => {}, [value]);
  return (
    <div className="block">
      <div className="p-[1px] inline-block bg-gradient-to-b from-[rgba(108,123,138,1)] to-[rgba(121,121,121,0.2)] rounded-md shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="rounded-md bg-dark flex w-full items-center justify-start">
          <div className="py-1 px-2 rounded-l-md bg-gradient-to-b from-[rgba(240,240,240,0.32)] to-[rgba(105,105,105,0.14)] text-sm select-none">Audio</div>
          {value ? (
            <p onClick={toggleAudio} className="cursor-pointer text-green-500 px-3 bg-green-500/20 rounded-r h-full flex py-0.5">
              ON
            </p>
          ) : (
            <p onClick={toggleAudio} className="cursor-pointer text-red-500 px-3 bg-red-500/20 rounded-r h-full flex py-0.5">
              OFF
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AudioCheckbox;
