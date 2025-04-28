import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const results = [];
  const workers = [];
  const promises = [];

  for (let i = 0; i < numCores; i++) {
    const worker = new Worker(path.resolve(import.meta.dirname, 'worker.js'));
    workers.push(worker);
    promises.push(new Promise((resolve) => {
      worker.once('message', (msg) => {
        resolve(msg);
      });
      worker.once('error', () => {
        resolve({status: 'error', data: null});
      });
      worker.once('exit', (code) => {
        if (code !== 0) {
          resolve({status: 'error', data: null});
        }
      });
    }));
    worker.postMessage(10 + i);
  }

  const settledResults = await Promise.all(promises);
  for (const result of settledResults) {
    results.push(result);
  }
  console.log(results);
};

await performCalculations();
