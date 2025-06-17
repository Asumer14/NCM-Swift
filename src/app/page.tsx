'use client';

import { useState, useCallback } from 'react';
import { FileUploader } from '@/components/ui/file-uploader';
import { FileList } from '@/components/ui/file-list';
import { FormatSelector } from '@/components/ui/format-selector';
import { DownloadButtons } from '@/components/ui/download-buttons';
import { DecryptResult } from '@/lib/ncm/entity';
import { NamingTemplate } from '@/components/ui/naming-template';
import { FileState } from '@/lib/types';

export default function Home() {
  const [files, setFiles] = useState<FileState[]>([]);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [namingTemplate, setNamingTemplate] = useState('[artist] - [title]');

  const handleDecrypt = useCallback((fileToDecrypt: FileState) => {
    setFiles((prevFiles) =>
      prevFiles.map((fileState) =>
        fileState.id === fileToDecrypt.id ? { ...fileState, status: 'decrypting' } : fileState,
      ),
    );

    const worker = new Worker(new URL('../worker/ncm.worker.ts', import.meta.url), {
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

  const handleClear = () => {
    setFiles([]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex-1 px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">NCM 文件解锁</h1>
            <p className="text-lg text-muted-foreground">轻松将您的 NCM 文件转换为 MP3 或 FLAC 格式。</p>
          </div>
          <FileUploader onFilesAccepted={handleFilesAccepted} />
          <div className="grid gap-4 md:grid-cols-2">
            <FormatSelector value={outputFormat} onValueChange={setOutputFormat} />
            <NamingTemplate value={namingTemplate} onValueChange={setNamingTemplate} />
          </div>
          <FileList files={files} namingTemplate={namingTemplate} />
          <DownloadButtons
            files={files.filter((f) => f.status === 'success')}
            format={outputFormat}
            template={namingTemplate}
          />
        </div>
      </main>
    </div>
  );
}
