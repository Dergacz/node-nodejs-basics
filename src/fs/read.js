import fs from 'fs/promises';

const read = async () => {
  const errorMessage = 'FS operation failed';
  const filePath = './files/fileToRead.txt';

  try {
    await fs.access(filePath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      const file = await fs.readFile(filePath, 'utf8');
      console.log(file);
    }
  }
};

await read();
