'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FormatSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function FormatSelector({ value, onValueChange }: FormatSelectorProps) {
  return (
    <div className="mt-8 w-full max-w-md">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">选择输出格式</h3>
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        defaultValue="mp3"
        className="mt-2 flex items-center space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="mp3" id="mp3" />
          <Label htmlFor="mp3" className="cursor-pointer text-base">
            MP3
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="flac" id="flac" />
          <Label htmlFor="flac" className="cursor-pointer text-base">
            FLAC
          </Label>
        </div>
      </RadioGroup>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        默认将转换为高质量的 MP3 文件。
      </p>
    </div>
  );
} 