import _ from 'lodash';

const extensionOfFile = (filepath) => {
  const extension = _.last(filepath.split('.'));
  return extension;
};

export default extensionOfFile;
