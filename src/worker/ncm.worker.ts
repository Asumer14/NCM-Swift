import { Decrypt } from '../lib/ncm/ncm';
import { DecryptResult } from '../lib/ncm/entity';

self.onmessage = async (event: MessageEvent<File>) => {
  const file = event.data;
  try {
    const result: DecryptResult = await Decrypt(file, file.name);
    self.postMessage({ status: 'success', result });
  } catch (e: any) {
    self.postMessage({ status: 'error', error: e.message });
  }
};

// This export is needed to satisfy the TypeScript compiler for modules.
export type {}; 