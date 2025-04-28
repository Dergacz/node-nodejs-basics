import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const inputPath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = path.join(__dirname, 'files', 'archive.gz');

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    const gzip = zlib.createGzip();

    readStream
      .pipe(gzip)
      .pipe(writeStream)
      .on('finish', () => resolve(undefined))
      .on('error', () => reject(undefined));
  });
};

await compress();
