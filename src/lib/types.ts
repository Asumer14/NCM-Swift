import type { DecryptResult } from './ncm/entity';

export type FileState = {
  id: string;
  file: File;
  status: 'pending' | 'decrypting' | 'success' | 'error';
  progress: number;
  result?: {
    blob: Blob;
    url: string;
    ext: string;
    title: string;
    artist?: string;
    album?: string;
    picture?: string;
  };
  error?: string;
}; 