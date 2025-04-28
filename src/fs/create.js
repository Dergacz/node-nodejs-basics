import { access, writeFile } from 'node:fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, '..');
  const content = 'I am fresh and young';
  const errorMessage = 'FS operation failed must be thrown';
  const filePath = join(__dirname, 'files', 'fresh.txt');

  try {
    await access(filePath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.message === errorMessage) {
      throw error;
    }
    await writeFile(filePath, content, 'utf8');
  }
};

await create();
