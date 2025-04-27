import { cp, access } from 'fs/promises';

const copy = async () => {
    const src = 'files';
    const dest = 'files_copy';
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

        await cp(src, dest, { recursive: true });
      } else {
        throw error;
      }
    }
};

await copy();
