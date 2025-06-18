'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FiMusic, FiDownload } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import type { FileState } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';

export type FileListProps = {
  files: FileState[];
  namingTemplate: string;
};

function getFileName(file: FileState, template: string) {
  if (!file.result) return `decrypted_file.mp3`;
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

  return `${finalName}.${file.result.ext}`;
}

export function FileList({ files, namingTemplate }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-8">
        <FiMusic className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4">请上传文件以开始</p>
      </div>
    );
  }

  const getStatusVariant = (status: FileState['status']) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getFormattedFileName = (file: FileState) => {
    if (!file.result) return file.file.name;
    return namingTemplate
      .replace(/\[artist\]/g, file.result.artist || 'Unknown Artist')
      .replace(/\[title\]/g, file.result.title || 'Unknown Title')
      .replace(/\[album\]/g, file.result.album || 'Unknown Album');
  };

  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-semibold mb-4">文件列表</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">封面</TableHead>
              <TableHead>歌曲信息</TableHead>
              <TableHead className="w-[120px]">状态</TableHead>
              <TableHead className="w-[120px] text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {files.map((file: FileState) => (
                <motion.tr
                  key={file.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="m-0 border-b p-0 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <TableCell>
                    <div className="relative w-16 h-16">
                      <Image
                        src={file.result?.picture || '/no-cover.svg'}
                        alt="album cover"
                        fill
                        unoptimized
                        className="rounded-md object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{getFormattedFileName(file)}</div>
                    <div className="text-sm text-muted-foreground">
                      {file.result?.artist} - {file.result?.album}
                    </div>
                    {file.status === 'decrypting' && <Progress value={file.progress} className="mt-2" />}
                    {file.status === 'error' && <p className="text-destructive text-sm mt-1">{file.error}</p>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(file.status)}>{file.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {file.status === 'success' && file.result?.blob && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => saveAs(file.result!.blob, getFileName(file, namingTemplate))}
                      >
                        <FiDownload className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 