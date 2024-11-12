import { Box, Text } from '@chakra-ui/react';
import * as reactDropzone from 'react-dropzone';
const { useDropzone } = reactDropzone;
import classes from './DragAndDrop.module.scss';
import classNames from 'classnames';
import { useCallback } from 'react';
import { FileWithPath } from 'react-dropzone';

type DragAndDropProps = {
  setUploadedFile: (file: FileWithPath | null) => void;
};

const DragAndDrop = ({ setUploadedFile }: DragAndDropProps) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        setUploadedFile(acceptedFiles[0]);
      }
    },
    [setUploadedFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <Box
      data-testid="drag-and-drop"
      {...getRootProps()}
      className={classNames(classes.container, {
        [classes.isDragActive]: isDragActive,
      })}
    >
      <input {...getInputProps()} accept="application/pdf" />
      {isDragActive ? (
        <Text>Drop to upload.</Text>
      ) : (
        <Text>Drag files or click here to upload</Text>
      )}
    </Box>
  );
};

export default DragAndDrop;
