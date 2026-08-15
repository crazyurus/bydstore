'use client';

import { useRouter } from 'next/navigation';
import type { JSX } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import platforms from './data/platform.json';

interface Props {
  platform: string;
}

function SelectPlatform(props: Props): JSX.Element {
  const router = useRouter();
  const handleChange = (value: string) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('platform', value);

    router.push('?' + searchParams.toString());
  };

  return (
    <Select value={props.platform} onValueChange={handleChange}>
      <SelectTrigger className="w-full cursor-pointer sm:w-72">
        <SelectValue placeholder="请选择 DiLink 平台" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>DiLink 平台</SelectLabel>
          {platforms.map((item, index) => (
            <SelectItem key={item.name} value={(index + 1).toString()}>
              <div className="flex items-center gap-1.5">
                <span>{item.name}</span>
                {item.version ? <span className="text-sm text-white/48">/</span> : null}
                <span className="text-sm text-white/62">{item.version}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectPlatform;
