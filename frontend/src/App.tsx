import { Box, Heading } from '@chakra-ui/react';
import './styles/main.scss';
import classes from './App.module.scss';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import { useCallback, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { useExtractData } from '@/api/hooks/';
import FilePreviewCard from '@/components/FilePreviewCard/FilePreviewCard.tsx';
import MetadataContainer from '@/components/MetadataContainer/MetadataContainer.tsx';

// TODO:responsive design! && test with backend if everything still works as expected

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
        <DragAndDrop onFileDrop={setUploadedFile} />
      ) : (
        <Box className={classes.fileExtractContainer}>
          <FilePreviewCard file={uploadedFile} onRemoveFile={onRemoveFile} />
          <MetadataContainer
            data={data}
            buttonProps={{
              pending: isPending,
              disabled: !uploadedFile || isPending,
              onClick: onProcessFile,
            }}
          />
        </Box>
      )}
    </div>
  );
}

export default App;
