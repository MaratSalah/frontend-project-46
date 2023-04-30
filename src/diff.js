import fs from 'node:fs';
import _ from 'lodash';
import path from 'node:path';

const diff = (filepath1, filepath2) => {
  const path1 = path.resolve(filepath1);
  const path2 = path.resolve(filepath2);

  const strOfFile1 = fs.readFileSync(path1);
  const strOfFile2 = fs.readFileSync(path2);

  const dataOfFile1 = JSON.parse(strOfFile1);
  const dataOfFile2 = JSON.parse(strOfFile2);

  const keys1 = Object.keys(dataOfFile1);
  const keys2 = Object.keys(dataOfFile2);

  const allKeys = [...keys1, ...keys2];

  const filteredKeys = allKeys.reduce((acc, key) => {
    if (acc.includes(key)) {
      return dataOfFile1[key] === dataOfFile2[key] ? acc : [...acc, key];
    }
    return [...acc, key];
  }, []);

  // В нижнем редьюсе последняя ветка предполагает что
  // в аккумуляторе больше нет других таких же значений ключа.
  // Если в ключе пройденном до этого момента было такое значение
  // как в одном из текущих ключей, в текущие значения
  // запишутся undefined

  const sortedKeys = _.sortBy(filteredKeys);

  const sortedValues = sortedKeys.reduce((acc, key) => {
    const valueOfFile1 = dataOfFile1[key];
    const valueOfFile2 = dataOfFile2[key];

    if (valueOfFile1 === valueOfFile2) {
      return [...acc, valueOfFile1];
    }
    if (Object.hasOwn(dataOfFile1, key) && !Object.hasOwn(dataOfFile2, key)) {
      return [...acc, valueOfFile1];
    }
    if (!Object.hasOwn(dataOfFile1, key) && Object.hasOwn(dataOfFile2, key)) {
      return [...acc, valueOfFile2];
    }
    if (!acc.includes(valueOfFile1) && !acc.includes(valueOfFile2)) {
      return [...acc, valueOfFile1, valueOfFile2];
    }
    return acc;
  }, []);

  const notFormattedResult = sortedKeys.map((key, i) => {
    const currentValue = sortedValues[i];
    const value1 = dataOfFile1[key];
    const value2 = dataOfFile2[key];

    // if (value1 === value2) {
    // return `  ${key}: ${currentValue}`;
    // }

    if (value1 !== value2) {
      if (value1 === currentValue) {
        return `- ${key}: ${currentValue}`;
      }
      return `+ ${key}: ${currentValue}`;
    }
    return `  ${key}: ${currentValue}`;
  });

  const result = `{\n  ${notFormattedResult.join('\n  ')}\n}`;

  // console.log(result);

  return result;
};

export default diff;
