import fs from 'fs/promises';

const remove = async () => {
  const errorMessage = 'FS operation failed';
  const filePath = './files/fileToRemove.txt';

  try {
    await fs.access(filePath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error) {
      await fs.rm(filePath);
    } else {
      throw error;
    }
  }
};

await remove();
