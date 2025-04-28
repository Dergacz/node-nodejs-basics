import { createReadStream } from 'node:fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  stream.on('data', (chunk) => {
    hash.update(chunk);
  });

  stream.on('end', () => {
    console.log(hash.digest('hex'));
  });

  stream.on('error', (err) => {
    console.error('Error reading the file:', err.message);
  });
};

await calculateHash();
