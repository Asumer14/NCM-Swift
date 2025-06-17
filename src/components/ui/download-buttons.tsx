'use client';

import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { FiPackage } from 'react-icons/fi';
import { FileState } from '@/lib/types';

interface DownloadButtonsProps {
  files: FileState[];
  format: string;
  template: string;
}

function getFileName(file: FileState, template: string, format: string) {
  if (!file.result) return `decrypted.${format}`;
  const artist = file.result.artist || '未知艺术家';
  const title = file.result.title || '未知标题';
  const album = file.result.album || '未知专辑';

  const sanitizedArtist = artist.replace(/[\\/:"*?<>|]/g, '_');
  const sanitizedTitle = title.replace(/[\\/:"*?<>|]/g, '_');
  const sanitizedAlbum = album.replace(/[\\/:"*?<>|]/g, '_');

  const finalName = template
    .replace(/\[artist\]/g, sanitizedArtist)
    .replace(/\[title\]/g, sanitizedTitle)
    .replace(/\[album\]/g, sanitizedAlbum);

  return `${finalName}.${format}`;
}

export function DownloadButtons({ files, format, template }: DownloadButtonsProps) {
  const handleBatchDownload = async () => {
    const zip = new JSZip();

    if (files.length === 0) return;

    files.forEach((f) => {
      if (f.result?.blob) {
        const fileName = getFileName(f, template, f.result.ext || format);
        zip.file(fileName, f.result.blob);
      }
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'NCMSwift_decrypted_files.zip');
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <Button onClick={handleBatchDownload} variant="secondary">
        <FiPackage className="mr-2 h-4 w-4" />
        打包下载 ({files.length})
      </Button>
    </div>
  );
} 