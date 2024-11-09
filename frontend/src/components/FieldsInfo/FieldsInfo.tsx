import { memo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FaCircleInfo } from 'react-icons/fa6';
import classes from './FieldsInfo.module.scss';

const FieldsInfo = () => {
  return (
    <Box className={classes.container}>
      <FaCircleInfo />
      <Text>Double click on field to make it editable</Text>
    </Box>
  );
};

export default memo(FieldsInfo);
