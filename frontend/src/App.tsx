import { Box, Button, Heading, IconButton } from '@chakra-ui/react';
import classes from './App.module.scss';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import { useCallback, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { MdClose } from 'react-icons/md';

function App() {
  const [uploadedFile, setUploadedFile] = useState<FileWithPath | null>(null);

  const onRemoveFile = useCallback(() => {
    setUploadedFile(null);
  }, [setUploadedFile]);

  return (
    <div className={classes.app}>
      <Heading as={'h1'}>Welcome to XYZ</Heading>
      <Heading as={'h6'}>Start by uploading document!</Heading>
      {!uploadedFile ? (
        <DragAndDrop setUploadedFile={setUploadedFile} />
      ) : (
        <Box className={classes.filePreview}>
          <IconButton onClick={onRemoveFile} variant={'outline'} size={'xs'}>
            <MdClose />
          </IconButton>
          <iframe height="100%" src={URL.createObjectURL(uploadedFile)} />
          <Button
            className={classes.processButton}
            disabled={!uploadedFile}
            onClick={() => {
              console.log('process file');
            }}
          >
            Process
          </Button>
        </Box>
      )}
    </div>
  );
}

export default App;
