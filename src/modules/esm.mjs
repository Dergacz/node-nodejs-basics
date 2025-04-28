import path from 'path';
import { release, version } from 'os';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import './files/c.cjs';

const random = Math.random();
const filePath = import.meta.url;
const dirPath = path.dirname(import.meta.url);

let unknownObject;

if (random > 0.5) {
  const fileData = await readFile('./src/modules/files/a.json', 'utf-8');
  unknownObject = JSON.parse(fileData);
} else {
  const fileData = await readFile('./src/modules/files/b.json', 'utf-8');
  unknownObject = JSON.parse(fileData);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${filePath}`);
console.log(`Path to current directory is ${dirPath}`);

const myServer = createServer((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
