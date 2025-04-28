import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from "url";
import { join } from "path";

const read = async () => {
  const errorMessage = 'FS operation failed';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, '..');
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  try {
    await access(filePath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      const file = await readFile(filePath, 'utf8');
      console.log(file);
    }
  }
};

await read();
