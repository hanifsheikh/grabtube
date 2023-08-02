import React from 'react';
import { raleway } from '@/utils/fonts';
type Props = {
  handleURLChange: (v: string) => void;
};

const URLInput: React.FC<Props> = ({ handleURLChange }) => {
  return (
    <div className="relative col-span-9 py-2.5 px-4 bg-white rounded-lg effect-thickness">
      <input
        name="url-input"
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          let input = e.target as HTMLInputElement;
          input.select();
        }}
        onChange={(e) => handleURLChange(e.target.value)}
        type="text"
        className={`${raleway.className} outline-none w-full text-dark text-xl font-normal`}
        placeholder="Paste youtube link here..."
        autoFocus
      />
    </div>
  );
};
export default URLInput;
