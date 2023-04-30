import diff from '../src/diff.js';

test('diff', () => {
  expect(diff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
