import { screen, render, act, fireEvent } from '@testing-library/react';
import DragAndDrop from '@/components/DragAndDrop/DragAndDrop.tsx';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { FileWithPath } from 'react-dropzone';

function mockData(files: File[]) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
}

describe('Drag and drop tests', async () => {
  it('should render "Drag files or click here to upload" by default', () => {
    const mockSetUploadedFile = vi.fn();
    render(
      <ChakraProvider value={defaultSystem}>
        <DragAndDrop onFileDrop={mockSetUploadedFile} />
      </ChakraProvider>,
    );
    expect(
      screen.getByText('Drag files or click here to upload'),
    ).toBeInTheDocument();
  });

  it('should not render "Drop to upload." by default', () => {
    const mockSetUploadedFile = vi.fn();
    render(
      <ChakraProvider value={defaultSystem}>
        <DragAndDrop onFileDrop={mockSetUploadedFile} />
      </ChakraProvider>,
    );
    expect(screen.queryByText('Drop to upload.')).toBeNull();
  });

  it('should render "Drop to upload." on drag', async () => {
    const mockFile: FileWithPath = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    });

    const data = mockData([mockFile]);
    const setUploadedFileMock = vi.fn();

    render(
      <ChakraProvider value={defaultSystem}>
        <DragAndDrop onFileDrop={setUploadedFileMock} />
      </ChakraProvider>,
    );

    await act(() =>
      fireEvent.dragEnter(screen.getByTestId('drag-and-drop'), data),
    );

    expect(screen.queryByText('Drop to upload.')).toBeInTheDocument();
  });

  it('should call "setUploadedFile" on drag drop in container', async () => {
    const mockFile: FileWithPath = new File(['test content'], 'test.pdf', {
      type: 'application/pdf',
    });

    const data = mockData([mockFile]);
    const setUploadedFileMock = vi.fn();

    render(
      <ChakraProvider value={defaultSystem}>
        <DragAndDrop onFileDrop={setUploadedFileMock} />
      </ChakraProvider>,
    );

    await act(async () => {
      fireEvent.dragEnter(screen.getByTestId('drag-and-drop'), data);
      fireEvent.drop(screen.getByTestId('drag-and-drop'), data);
    });

    expect(setUploadedFileMock).toBeCalled();
  });
});
