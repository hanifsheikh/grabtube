import React, { useEffect, useState } from 'react';

type Props = {
  code: string;
};

const PortionCutOutput: React.FC<Props> = ({ code }) => {
  const [portion_cut_command, setProtionCutCommand] = useState<string>('');
  useEffect(() => {
    setProtionCutCommand(() => code);
  }, [code]);
  return (
    <div className="block mt-3">
      <div className="p-[1px] bg-gradient-to-b from-[rgba(108,123,138,1)] to-[rgba(121,121,121,0.2)] rounded-md shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="rounded-md bg-dark flex w-full items-center justify-start space-x-2 pr-2">
          <div className="py-1 px-2 rounded-l-md bg-gradient-to-b from-[rgba(240,240,240,0.32)] to-[rgba(105,105,105,0.14)] text-sm select-none">Command</div>
          <input
            readOnly
            className="bg-transparent outline-none w-full text-xs"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              let input = e.target as HTMLInputElement;
              input.select();
            }}
            type="text"
            defaultValue={portion_cut_command}
          />
        </div>
      </div>
    </div>
  );
};
export default PortionCutOutput;
