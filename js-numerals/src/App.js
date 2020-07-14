import React, { useState } from 'react';
import { Alert, Container, InputGroup, FormControl, Button } from 'react-bootstrap';

export function convertNumerals(number, type) {
  return "zero";
};

export default function App() {
  const [number, setNumber] = useState(0);
  const [englishNumeral, setEnglishNumeral] = useState('zero');

  const numberChangeHandler = e => {
    setNumber(e.target.value);
  };

  const submitHandler = () => {
    setEnglishNumeral(convertNumerals(number));
  };

  return (
    <Container className='pt-5'>
      <h1 className='mb-3'>JS Numerals</h1>
      <Alert variant='dark'>
        {englishNumeral}
      </Alert>
      <InputGroup>
        <FormControl
          type='number'
          value={number}
          onChange={numberChangeHandler}
          min={0}
          max={Number.MAX_SAFE_INTEGER}
        />
        <InputGroup.Append>
          <Button variant='primary' onClick={submitHandler}>Submit</Button>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  );
}
