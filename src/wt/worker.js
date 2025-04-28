import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (status, data) => {
  parentPort?.postMessage({status, data});
};

if (parentPort) {
  parentPort.on('message', (n) => {
    try {
      const result = nthFibonacci(n);
      sendResult('resolved', result);
    } catch (error) {
      sendResult('error', null);
    }
  });
}
