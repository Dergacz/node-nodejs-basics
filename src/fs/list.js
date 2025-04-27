import fs from 'fs/promises';

const list = async () => {
  const errorMessage = 'FS operation failed';
  const folderPath = './files';

  try {
    await fs.access(folderPath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      const files = await fs.readdir(folderPath);
      console.log(files);
    }
  }
};

await list();
