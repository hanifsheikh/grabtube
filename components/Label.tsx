import React, { ReactNode } from 'react';

const Label: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="block">
      <div className="p-[1px] inline-block bg-gradient-to-b from-[rgba(108,123,138,1)] to-[rgba(121,121,121,0.2)] rounded-md shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="rounded-md bg-dark flex w-full items-center justify-start space-x-2 pr-2">{children}</div>
      </div>
    </div>
  );
};
export default Label;
