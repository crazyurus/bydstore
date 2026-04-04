'use client';

import Link from 'next/link';
import { JSX } from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  url: string;
}

function ActionButton(props: Props): JSX.Element {
  return (
    <Button className="w-full cursor-pointer" asChild>
      <Link href={props.url} target="_blank" rel="noreferrer">
        立即下载
      </Link>
    </Button>
  );
}

export default ActionButton;
