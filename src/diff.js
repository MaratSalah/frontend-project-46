import _ from 'lodash';
import jsonDiff from './jsonDiff.js';
import ymlDiff from './ymlDiff.js';

const extensionCheck = (filepath) => {
  const extensionOfFile = _.last(filepath.split('.'));
  return extensionOfFile;
};

const diff = (filepath1, filepath2) => {
  if (extensionCheck(filepath1) !== extensionCheck(filepath2)) {
    return null;
  }

  if (extensionCheck(filepath1) === 'yml') {
    return ymlDiff(filepath1, filepath2);
  }

  return jsonDiff(filepath1, filepath2);
};

export default diff;
