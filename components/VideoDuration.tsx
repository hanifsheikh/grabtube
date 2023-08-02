import React from 'react';

type Props = {
  duration: string;
  isLive: boolean;
};

const VideoDuration: React.FC<Props> = ({ duration, isLive }) => {
  if (!isLive) {
    if (duration.split(':').length == 1) {
      duration += ' sec';
    }
  }
  return isLive ? (
    <div className="block">
      <div className="inline-block py-1 px-2 rounded-md bg-gradient-to-b from-[rgba(255,0,0,0.80)] to-[rgba(245,0,0,0.25)] text-sm select-none">Live Streaming</div>
    </div>
  ) : (
    <div className="block">
      <div className="p-[1px] inline-block bg-gradient-to-b from-[rgba(108,123,138,1)] to-[rgba(121,121,121,0.2)] rounded-md shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="rounded-md bg-dark flex w-full items-center justify-start space-x-2 pr-2">
          <div className="flex py-1 px-2 rounded-l-md bg-gradient-to-b from-[rgba(240,240,240,0.32)] to-[rgba(105,105,105,0.14)] text-sm select-none">Duration</div>
          <p className="text-sm break-all"> {duration} </p>
        </div>
      </div>
    </div>
  );
};
export default VideoDuration;
