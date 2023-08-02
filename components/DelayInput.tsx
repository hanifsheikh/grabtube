import React from 'react';
import Label from './Label';
type Props = {
  delay: number;
  setDelay: Function;
};

const DelayInput: React.FC<Props> = ({ delay, setDelay }) => {
  return (
    <Label>
      <div className="py-1 px-2 rounded-l-md bg-gradient-to-b from-[rgba(240,240,240,0.32)] to-[rgba(105,105,105,0.14)] text-sm select-none">Delay</div>
      <input defaultValue={delay} className="bg-transparent outline-none w-24 text-sm" onChange={(e) => setDelay(e.target.value)} type="number" />
    </Label>
  );
};
export default DelayInput;
