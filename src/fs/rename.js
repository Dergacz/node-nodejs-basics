import { access, rename as fsRename } from 'fs/promises'
import { fileURLToPath } from "url";
import { join } from "path";

const rename = async () => {
  const errorMessage = 'FS operation failed';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, '..');
  const src = join(__dirname, 'files', 'wrongFilename.txt');
  const dest = join(__dirname, 'files', 'properFilename.md');

  try {
    await access(src);
    await access(dest);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      if (error.path === src) {
        throw new Error(errorMessage);
      }
      await fsRename(src, dest);
    } else {
      throw error;
    }
  }
};

await rename();
