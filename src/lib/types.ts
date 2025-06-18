import type { DecryptResult } from './ncm/entity';

export type FileState = {
  id: string;
  file: File;
  status: 'pending' | 'decrypting' | 'success' | 'error';
  progress: number;
  result?: DecryptResult;
  error?: string;
}; 