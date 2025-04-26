import fs from 'fs/promises';
import { join } from 'path';

const create = async () => {
  const content = 'I am fresh and young';
  const errorMessage = 'FS operation failed must be thrown';
  const filePath = join('./files, fresh.txt');

  try {
    await fs.access(filePath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.message === errorMessage) {
      throw error;
    }
    await fs.writeFile(filePath, content, 'utf8');
  }
};

await create();
