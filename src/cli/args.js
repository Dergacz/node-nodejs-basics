const parseArgs = () => {
  const args = process.argv.slice(2);
  const arr = [];

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].replace('--', '');
    const value = args[i + 1];
    arr.push(`${propName} is ${value}`);
  }
  const result = arr.join(', ');

  console.log(result);
};

parseArgs();
