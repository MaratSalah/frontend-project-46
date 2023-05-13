import { yamlParser } from './parsers.js';
import diffEngine from './diffEngine.js';

const yamlDiff = (filepath1, filepath2) => {
  const [dataOfFile1, dataOfFile2] = yamlParser(filepath1, filepath2);

  return diffEngine(dataOfFile1, dataOfFile2);
};

// yamlDiff('../__fixtures__/file1.yaml', '../__fixtures__/file2.yaml');

export default yamlDiff;

/*
const nonFormattedResult = sortedKeys.map((key) => {
  const value1 = dataOfFile1[key];
  const value2 = dataOfFile2[key];
  if (value1 === value2) {
    return { symbol: ' ', key, value: value1 };
  }

  if (Object.hasOwn(dataOfFile1, key) && !Object.hasOwn(dataOfFile2, key)) {
    return { symbol: '-', key, value: value1 };
  }

  if (!Object.hasOwn(dataOfFile1, key) && Object.hasOwn(dataOfFile2, key)) {
    return { symbol: '+', key, value: value2 };
  }

  return {  }; */
