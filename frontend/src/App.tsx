import { Heading } from '@chakra-ui/react';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.app}>
      <Heading as={'h1'}>Welcome to XYZ</Heading>
      <Heading as={'h6'}>Start by uploading document!</Heading>
    </div>
  );
}

export default App;
