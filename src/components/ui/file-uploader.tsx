'use client';

import { useCallback } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { toast } from 'sonner';
import { FiUploadCloud } from 'react-icons/fi';

interface FileUploaderProps {
  onFilesAccepted: (files: File[]) => void;
}

export function FileUploader({ onFilesAccepted }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        toast.error('文件格式不正确', {
          description: '请只上传 .ncm 格式的音乐文件。',
        });
      }

      if (acceptedFiles.length > 0) {
        onFilesAccepted(acceptedFiles);
        toast.success('文件已添加', {
          description: `${acceptedFiles.length} 个文件已成功添加到待处理列表。`,
        });
      }
    },
    [onFilesAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/ncm': ['.ncm'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group relative mt-8 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-center transition-colors duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-400 dark:hover:bg-gray-700 ${
        isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' : ''
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <FiUploadCloud
          className={`h-16 w-16 text-gray-400 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400 ${
            isDragActive ? 'scale-110 text-blue-500' : ''
          }`}
        />
        {isDragActive ? (
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-300">
            是的，就拖到这里！
          </p>
        ) : (
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              将文件拖拽至此，或 <span className="text-blue-500">点击选择文件</span>
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              支持批量上传 .ncm 格式文件
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 