import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathOfFile = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diffForJson', () => {
  expect(diff(getPathOfFile('file1.json'), getPathOfFile('file2.json'))).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('diffForYaml and yml', () => {
  expect(diff(getPathOfFile('file1.yaml'), getPathOfFile('file2.yaml'))).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
