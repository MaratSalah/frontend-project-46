import { jsonParser } from './parsers.js';
import diffEngine from './diffEngine.js';

const jsonDiff = (filepath1, filepath2) => {
  const [dataOfFile1, dataOfFile2] = jsonParser(filepath1, filepath2);

  return diffEngine(dataOfFile1, dataOfFile2);
};

// yamlDiff('../__fixtures__/file1.yaml', '../__fixtures__/file2.yaml');

export default jsonDiff;
