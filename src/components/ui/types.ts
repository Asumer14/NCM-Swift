import type { NCMetadata } from '@/worker/ncm.worker';

export type FileStatus = 'pending' | 'decrypting' | 'success' | 'error';

interface BaseProcessedFile {
  id: string;
  sourceFile: File;
  status: FileStatus;
}

export interface PendingFile extends BaseProcessedFile {
  status: 'pending';
}

export interface DecryptingFile extends BaseProcessedFile {
  status: 'decrypting';
}

export interface SuccessFile extends BaseProcessedFile {
  status: 'success';
  metadata: NCMetadata;
  albumArt: Blob | null;
  audioData: Blob;
}

export interface ErrorFile extends BaseProcessedFile {
  status: 'error';
  error: string;
}

export type ProcessedFile =
  | PendingFile
  | DecryptingFile
  | SuccessFile
  | ErrorFile; 