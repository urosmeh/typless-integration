import { Box, Button, Heading, Card, Text, Spinner } from '@chakra-ui/react';
import classes from './App.module.scss';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import { useCallback, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { useExtractData } from '@/api/hooks/';
import MetadataCard from '@/components/MetadataCard/MetadataCard.tsx';

function App() {
  const [uploadedFile, setUploadedFile] = useState<FileWithPath | null>(null);
  const { mutate, isPending, data } = useExtractData();

  //todo: responsive design

  const onRemoveFile = useCallback(() => {
    setUploadedFile(null);
  }, [setUploadedFile]);

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
          <Card.Root className={classes.cardRoot}>
            <Card.Title>
              <Text>File preview</Text>
            </Card.Title>
            <Card.Body className={classes.filePreview}>
              <iframe height="100%" src={URL.createObjectURL(uploadedFile)} />
            </Card.Body>
            <Card.Footer className={classes.cardFooter}>
              <Button onClick={onRemoveFile} colorPalette={'red'}>
                Remove file
              </Button>
            </Card.Footer>
          </Card.Root>
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
