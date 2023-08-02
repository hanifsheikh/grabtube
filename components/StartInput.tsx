import React from 'react';
import Label from './Label';
type Props = {
  setStartTime: Function;
};

const StartInput: React.FC<Props> = ({ setStartTime }) => {
  return (
    <Label>
      <div className="py-1 px-2 rounded-l-md bg-gradient-to-b from-[rgba(240,240,240,0.32)] to-[rgba(105,105,105,0.14)] text-sm select-none">Start</div>
      <input className="bg-transparent outline-none w-24 text-sm" onChange={(e) => setStartTime(e.target.value)} type="text" />
    </Label>
  );
};
export default StartInput;
