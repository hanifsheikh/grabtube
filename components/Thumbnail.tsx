import Image from 'next/image';
import { shimmer, toBase64 } from '@/components/Shimmer';
import React from 'react';
type Props = {
  url: string;
};

const Thumbnail: React.FC<Props> = ({ url }) => {
  const timestamp = Date.now();
  // const timestamp = 1;
  return (
    <div className="p-[1px] inline-block bg-gradient-to-bl from-[rgba(108,123,138,1)] to-[rgba(121,121,121,0.2)] rounded-lg shadow-thumbnail">
      <div className="p-2 rounded-lg bg-dark flex items-center justify-center">
        <Image className="rounded" height={188} width={334} src={`${url}?cache=${timestamp}`} alt="thumbnail" placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(334, 188))}`} />
      </div>
    </div>
  );
};
export default Thumbnail;
