import { Box, Button, Heading, Spinner } from '@chakra-ui/react';
import classes from './App.module.scss';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import { useCallback, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { useExtractData } from '@/api/hooks/';
import MetadataCard from '@/components/MetadataCard/MetadataCard.tsx';
import FilePreviewCard from '@/components/FilePreviewCard/FilePreviewCard.tsx';

function App() {
  const [uploadedFile, setUploadedFile] = useState<FileWithPath | null>(null);
  const { mutate, isPending, data, reset } = useExtractData();

  const onRemoveFile = useCallback(() => {
    setUploadedFile(null);
    reset();
  }, [setUploadedFile, reset]);

  const onProcessFile = async () => {
    if (!uploadedFile) return;
    const formData = new FormData();
    formData.append('file', uploadedFile);
    mutate(formData);
  };

  return (
    <div className={classes.app}>
      <Heading as={'h1'}>Welcome to XYZ</Heading>
      <Heading as={'h6'}>Start by uploading document!</Heading>
      {!uploadedFile ? (
        <DragAndDrop setUploadedFile={setUploadedFile} />
      ) : (
        <Box className={classes.fileExtractContainer}>
          <FilePreviewCard file={uploadedFile} onRemoveFile={onRemoveFile} />
          {!data ? (
            <Box className={classes.fileMetadataContainer}>
              <Button
                className={classes.processButton}
                disabled={!uploadedFile || isPending}
                onClick={onProcessFile}
                colorPalette={'green'}
              >
                Process
              </Button>
              {isPending && <Spinner colorPalette={'green'} />}
            </Box>
          ) : (
            <MetadataCard extractedData={data} />
          )}
        </Box>
      )}
    </div>
  );
}

export default App;
