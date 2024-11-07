import { Heading, Box } from '@chakra-ui/react';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.app}>
      <Heading as={'h1'}>Welcome to XYZ</Heading>
      <Heading as={'h6'}>Start by uploading document!</Heading>
      <Box></Box>
    </div>
  );
}

export default App;
