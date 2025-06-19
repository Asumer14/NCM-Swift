'use client';

import { useState, useCallback } from 'react';
import { FileUploader } from '@/components/ui/file-uploader';
import { FileList } from '@/components/ui/file-list';
import { DownloadButtons } from '@/components/ui/download-buttons';
import { DecryptResult } from '@/lib/ncm/entity';
import { NamingTemplate } from '@/components/ui/naming-template';
import { FileState } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [files, setFiles] = useState<FileState[]>([]);
  const [namingTemplate, setNamingTemplate] = useState('[artist] - [title]');
  const [zipFileName, setZipFileName] = useState('NCMSwift_decrypted_files');

  const handleDecrypt = useCallback((fileToDecrypt: FileState) => {
    setFiles((prevFiles) =>
      prevFiles.map((fileState) =>
        fileState.id === fileToDecrypt.id ? { ...fileState, status: 'decrypting' } : fileState,
      ),
    );

    const worker = new Worker(new URL('../../worker/ncm.worker.ts', import.meta.url), {
      type: 'module',
    });

    worker.onmessage = (event: MessageEvent<{ status: string; result?: DecryptResult; error?: string }>) => {
      const { status, result, error } = event.data;
      if (status === 'success' && result) {
        setFiles((prevFiles) =>
          prevFiles.map((fileState) =>
            fileState.id === fileToDecrypt.id
              ? {
                  ...fileState,
                  status: 'success',
                  progress: 100,
                  result: result,
                }
              : fileState,
          ),
        );
      } else {
        setFiles((prevFiles) =>
          prevFiles.map((fileState) =>
            fileState.id === fileToDecrypt.id
              ? {
                  ...fileState,
                  status: 'error',
                  error: error || 'Unknown error',
                }
              : fileState,
          ),
        );
      }
      worker.terminate();
    };

    worker.onerror = (event) => {
      setFiles((prevFiles) =>
        prevFiles.map((fileState) =>
          fileState.id === fileToDecrypt.id
            ? {
                ...fileState,
                status: 'error',
                error: event.message,
              }
            : fileState,
        ),
      );
      worker.terminate();
    };

    worker.postMessage(fileToDecrypt.file);
  }, []);

  const handleFilesAccepted = (acceptedFiles: File[]) => {
    const newFiles: FileState[] = acceptedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      file: file,
      status: 'pending',
      progress: 0,
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    newFiles.forEach(handleDecrypt);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">NCM 文件解锁</h1>
            <p className="text-lg text-muted-foreground">轻松将您的 NCM 文件转换为 MP3 格式。</p>
          </div>
          <FileUploader onFilesAccepted={handleFilesAccepted} />
          <div className="grid gap-4">
            <NamingTemplate value={namingTemplate} onValueChange={setNamingTemplate} />
          </div>
          <div className="max-h-96 overflow-y-auto rounded-lg border">
            <FileList files={files} namingTemplate={namingTemplate} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="zip-filename">压缩包名称</Label>
              <Input
                id="zip-filename"
                value={zipFileName}
                onChange={(e) => setZipFileName(e.target.value)}
                placeholder="输入压缩包文件名"
              />
            </div>
            <div className="flex items-end">
              <DownloadButtons
                files={files.filter((f) => f.status === 'success')}
                format="mp3"
                template={namingTemplate}
                zipFileName={zipFileName}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
