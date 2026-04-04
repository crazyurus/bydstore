'use client';

import { ChevronRight } from 'lucide-react';
import { JSX } from 'react';

import { Button } from '@/components/ui/button';

function ActionButton(): JSX.Element {
  return (
    <Button className="cursor-pointer" size="sm" variant="secondary">
      查看详情
      <ChevronRight />
    </Button>
  );
}

export default ActionButton;
