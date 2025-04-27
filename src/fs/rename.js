import fs from 'fs/promises'

const rename = async () => {
    const errorMessage = 'FS operation failed';
    const src = './files/wrongFilename.txt';
    const dest = './files/properFilename.md';

    try {
      await fs.access(src);
      await fs.access(dest);
      throw new Error(errorMessage);
    } catch (error) {
      if (error.code === 'ENOENT') {
        if (error.path === src) {
          throw new Error(errorMessage);
        }
        await fs.rename(src, dest);
      } else {
        throw error;
      }
    }
};

await rename();
