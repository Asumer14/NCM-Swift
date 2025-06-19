'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <div className="space-y-2">
      <h3 className="text-lg font-medium">
        文件名格式
      </h3>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
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
  );
} 