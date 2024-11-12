import { expect, beforeEach, vi, afterEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

const queryClient = new QueryClient();

beforeEach(() => {
  window.URL.createObjectURL = vi.fn();
  render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>,
  );
});

afterEach(() => {
  vi.clearAllMocks();
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

  it('should render drag and drop', () => {
    expect(screen.getByTestId('drag-and-drop')).toBeInTheDocument();
  });

  it('should not render drag and drop if file is uploaded', async () => {
    expect(screen.getByTestId('drag-and-drop')).toBeInTheDocument();
    const file = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    });

    const fileInput = screen
      .getByTestId('drag-and-drop')
      .querySelector('input[type="file"]') as HTMLInputElement;

    if (fileInput) {
      await userEvent.upload(fileInput, file);
    }
  });
});
