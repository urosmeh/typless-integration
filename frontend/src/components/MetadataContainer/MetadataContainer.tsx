import { ExtractDataType } from '@/models/typless.ts';
import MetadataCard from '@/components/MetadataCard/MetadataCard.tsx';
import { Box, Button, Spinner } from '@chakra-ui/react';
import classes from './MetadataContainer.module.scss';

type MetadataContainerProps = {
  data: ExtractDataType | undefined;
  buttonProps: {
    disabled: boolean;
    pending: boolean;
    onClick: () => void;
  };
};
const MetadataContainer = ({ data, buttonProps }: MetadataContainerProps) => {
  if (data) {
    return <MetadataCard extractedData={data} />;
  }

  return (
    <Box className={classes.container}>
      <Button
        disabled={buttonProps.disabled}
        onClick={buttonProps.onClick}
        colorPalette={'green'}
      >
        Process
      </Button>
      {buttonProps.pending && <Spinner colorPalette={'green'} />}
    </Box>
  );
};

export default MetadataContainer;
