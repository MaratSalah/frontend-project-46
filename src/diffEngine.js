import _ from 'lodash';

const diffEngine = (dataOfFile1, dataOfFile2) => {
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

export default diffEngine;
