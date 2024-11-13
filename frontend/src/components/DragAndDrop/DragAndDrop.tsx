import { Box, Text } from '@chakra-ui/react';
import * as reactDropzone from 'react-dropzone';
const { useDropzone } = reactDropzone;
import classes from './DragAndDrop.module.scss';
import classNames from 'classnames';
import { useCallback } from 'react';
import { FileWithPath } from 'react-dropzone';

type DragAndDropProps = {
  onFileDrop: (file: FileWithPath | null) => void;
};

const DragAndDrop = ({ onFileDrop }: DragAndDropProps) => {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        onFileDrop(acceptedFiles[0]);
      }
    },
    [onFileDrop],
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
