import test from 'node:test';
import assert from 'node:assert/strict';

import { getApiBaseUrl } from './environment.js';

test('uses Codespaces host when CODESPACE_NAME is set', () => {
  const previous = process.env.CODESPACE_NAME;
  process.env.CODESPACE_NAME = 'octofit-demo';

  try {
    assert.equal(getApiBaseUrl(), 'https://octofit-demo-8000.app.github.dev');
  } finally {
    if (previous === undefined) {
      delete process.env.CODESPACE_NAME;
    } else {
      process.env.CODESPACE_NAME = previous;
    }
  }
});

test('falls back to localhost when CODESPACE_NAME is missing', () => {
  const previous = process.env.CODESPACE_NAME;
  delete process.env.CODESPACE_NAME;

  try {
    assert.equal(getApiBaseUrl(), 'http://localhost:8000');
  } finally {
    if (previous === undefined) {
      delete process.env.CODESPACE_NAME;
    } else {
      process.env.CODESPACE_NAME = previous;
    }
  }
});
