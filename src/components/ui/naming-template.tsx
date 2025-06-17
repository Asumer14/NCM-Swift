'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface NamingTemplateProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PRESET_TEMPLATES = [
  {
    label: '艺术家 - 歌曲名',
    value: '[artist] - [title]',
  },
  {
    label: '歌曲名 - 艺术家',
    value: '[title] - [artist]',
  },
  {
    label: '歌曲名',
    value: '[title]',
  },
];

export function NamingTemplate({ value, onValueChange }: NamingTemplateProps) {
  return (
    <div className="mt-8 w-full max-w-md">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        自定义文件名格式
      </h3>
      <div className="mt-2 flex items-center space-x-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="例如: [artist] - [title]"
          className="flex-grow"
        />
        <Select onValueChange={(selectedValue) => onValueChange(selectedValue)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择预设模板" />
          </SelectTrigger>
          <SelectContent>
            {PRESET_TEMPLATES.map((template) => (
              <SelectItem key={template.value} value={template.value}>
                {template.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        可用变量: `[artist]`, `[title]`, `[album]`
      </p>
    </div>
  );
} 