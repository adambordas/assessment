import React, { useState } from 'react';
import { Alert, Container, InputGroup, FormControl, Button } from 'react-bootstrap';

const literals = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};

const type = [
  'thousand',
  'million',
  'billion',
  'trillion',
  'quadrillion'
];

/**
 * Normalize string by removing trailing and repeating spaces
 * @param {target} string
 */
const normalize = string => string.replace(/ {2,}/g, ' ').trim();

/**
 * Converts an integer between 0 and Number.MAX_SAFE_INTEGER to words
 * @param {target} number
 * @param {enum} scale possible values: thousand, million, billion, trillion, quadrillion
 */
export function convertNumerals(number, scale) {
  if (number < 0 || number > Number.MAX_SAFE_INTEGER || !Number.isInteger(number)) {
    throw new Error('Wrong attributes');
  }

  let numeral = '';

  const current = number % 1000;
  const hundreds = Math.floor(current / 100);
  const tens = Math.floor(current % 100 / 10);
  const ones = current % 10;

  if (number < 1000 && !scale && current === 0) {
    return literals[number];
  }

  if (hundreds > 0) {
    numeral = `${literals[hundreds]} hundred `;
  }

  if (tens < 2 && (tens > 0 || ones > 0)) {
    numeral = `${numeral} ${literals[tens * 10 + ones]} `;
  } else if (tens >= 2 && ones === 0) {
    numeral = `${numeral} ${literals[tens * 10]} `;
  } else if (tens >= 2) {
    numeral = `${numeral} ${literals[tens * 10]}-${literals[ones]} `;
  }

  if (scale && current > 0) {
    numeral = `${numeral} ${scale} `;
  }

  if (number > 999) {
    return normalize(`${convertNumerals(Math.floor(number / 1000), type[type.findIndex(t => t === scale) + 1])} ${numeral}`);
  } else {
    return normalize(numeral);
  }
};

export default function App() {
  const [number, setNumber] = useState(0);
  const [englishNumeral, setEnglishNumeral] = useState('zero');

  /**
   * Updates state when changing number input
   * @param {event} e
   */
  const numberChangeHandler = e => {
    setNumber(e.target.value);
  };

  /**
   * Updates result string when clicking submit button
   */
  const submitHandler = () => {
    setEnglishNumeral(convertNumerals(parseInt(number)));
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
