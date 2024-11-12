import { FileWithPath } from 'react-dropzone';
import { Button, Card, Text } from '@chakra-ui/react';
import classes from './FilePreviewCard.module.scss';

type FilePreviewCardProps = {
  file: FileWithPath;
  onRemoveFile: () => void;
};

const FilePreviewCard = ({ file, onRemoveFile }: FilePreviewCardProps) => {
  return (
    <Card.Root className={classes.container}>
      <Card.Title>
        <Text>File preview</Text>
      </Card.Title>
      <Card.Body>
        <iframe height="100%" src={URL.createObjectURL(file)} />
      </Card.Body>
      <Card.Footer className={classes.cardFooter}>
        <Button onClick={onRemoveFile} colorPalette={'red'}>
          Remove file
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default FilePreviewCard;
