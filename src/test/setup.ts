import '@testing-library/jest-dom';

// Global test setup
// Add any global mocks or setup here

// Example: Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Example: Mock next/image
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    return Object.assign(document.createElement('img'), props);
  },
}));
