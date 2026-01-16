'use client';

import { JSX, type MouseEvent } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface Props {
  url: string;
}

function ActionButton(props: Props): JSX.Element {
  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    toast.info('暂不支持下载');
  };

  return (
    <Button className="cursor-pointer w-full" onClick={handleDownload}>
      下载
    </Button>
  );
}

export default ActionButton;
