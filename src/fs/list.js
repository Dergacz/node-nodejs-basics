import { access, readdir } from 'node:fs/promises';
import { fileURLToPath } from "url";
import { join } from "path";

const list = async () => {
  const errorMessage = 'FS operation failed';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, '..');
  const folderPath = join(__dirname, 'files');

  try {
    await access(folderPath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      const files = await readdir(folderPath);
      console.log(files);
    }
  }
};

await list();
