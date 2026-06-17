import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// With Vitest globals disabled, register Testing Library's DOM cleanup explicitly.
afterEach(() => {
  cleanup();
});
