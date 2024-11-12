import { expect, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from '../src/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

const queryClient = new QueryClient();

beforeEach(() => {
  render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>,
  );
});

describe('App tests', async () => {
  it('should render h1 with content', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Welcome to XYZ',
    );
  });

  it('should render h6 with content', () => {
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
      'Start by uploading document!',
    );
  });
});
