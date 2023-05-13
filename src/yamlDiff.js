import fs from 'node:fs';
import _ from 'lodash';
import path from 'node:path';
import yaml from 'js-yaml';

const yamlDiff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);

  const strOfFile1 = fs.readFileSync(path1);
  const strOfFile2 = fs.readFileSync(path2);

  const dataOfFile1 = yaml.load(strOfFile1);
  const dataOfFile2 = yaml.load(strOfFile2);

  const keys1 = Object.keys(dataOfFile1);
  const keys2 = Object.keys(dataOfFile2);

  const allKeys = [...keys1, ...keys2];

  const filteredKeys = allKeys.reduce((acc, key) => {
    if (acc.includes(key)) {
      return dataOfFile1[key] === dataOfFile2[key] ? acc : [...acc, key];
    }
    return [...acc, key];
  }, []);

  const sortedKeys = _.sortBy(filteredKeys);

  const nonFormattedResult = sortedKeys.map((key) => {
    const value1 = dataOfFile1[key];
    const value2 = dataOfFile2[key];
    if (value1 === value2) {
      return `  ${key}: ${value1}`;
    }

    if (Object.hasOwn(dataOfFile1, key) && !Object.hasOwn(dataOfFile2, key)) {
      return `- ${key}: ${value1}`;
    }

    if (!Object.hasOwn(dataOfFile1, key) && Object.hasOwn(dataOfFile2, key)) {
      return `+ ${key}: ${value2}`;
    }

    return `- ${key}: ${value1}\n  + ${key}: ${value2}`;
  });

  const result = `{\n  ${_.uniq(nonFormattedResult).join('\n  ')}\n}`;

  // console.log(result);
  return result;
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
