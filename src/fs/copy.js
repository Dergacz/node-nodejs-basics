import { cp, access } from 'node:fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, '..');
  const src = join(__dirname, 'files');
  const dest = join(__dirname, 'files_copy');
  const errorMessage = 'FS operation failed';

  try {
    await access(src);
    await access(dest);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      if (error.path === src) {
        throw new Error(errorMessage);
      }

      await cp(src, dest, {recursive: true});
    } else {
      throw error;
    }
  }
};

await copy();
