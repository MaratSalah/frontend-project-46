import jsonDiff from './jsonDiff.js';
import yamlDiff from './yamlDiff.js';
import extensionOfFile from './helpers.js';

const diff = (filepath1, filepath2) => {
  if (extensionOfFile(filepath1) === 'yml' || extensionOfFile(filepath1) === 'yaml') {
    return yamlDiff(filepath1, filepath2);
  }

  return jsonDiff(filepath1, filepath2);
};

export default diff;
