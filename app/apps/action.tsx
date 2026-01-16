'use client';

import { JSX, type MouseEvent } from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  url: string;
}

function ActionButton(props: Props): JSX.Element {
  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    location.assign(props.url);
  };

  return (
    <>
      <Button className="cursor-pointer" size="sm">
        查看
      </Button>
      <Button className="cursor-pointer" size="sm" variant="outline" onClick={handleDownload}>
        下载
      </Button>
    </>
  );
}

export default ActionButton;
