import { access, rm } from 'node:fs/promises';
import { fileURLToPath } from "url";
import { join } from "path";

const remove = async () => {
  const errorMessage = 'FS operation failed';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, '..');
  const filePath = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await access(filePath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error) {
      await rm(filePath);
    } else {
      throw error;
    }
  }
};

await remove();
