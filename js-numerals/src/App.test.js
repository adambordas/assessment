import { convertNumerals } from './App.js';

describe('convertNumerals', () => {
  it('handles numbers less then 20', () => {
    expect(convertNumerals(0)).toBe('zero');
    expect(convertNumerals(1)).toBe('one');
    expect(convertNumerals(2)).toBe('two');
    expect(convertNumerals(10)).toBe('ten');
    expect(convertNumerals(11)).toBe('eleven');
    expect(convertNumerals(19)).toBe('nineteen');
  });

  it('handles numbers between 20 and 99', () => {
    expect(convertNumerals(20)).toBe('twenty');
    expect(convertNumerals(30)).toBe('thirty');
    expect(convertNumerals(50)).toBe('fifty');
    expect(convertNumerals(80)).toBe('eighty');

    
    expect(convertNumerals(21)).toBe('twenty-one');
    expect(convertNumerals(33)).toBe('thirty-three');
    expect(convertNumerals(46)).toBe('forty-six');
    expect(convertNumerals(99)).toBe('ninety-nine');
  });

  it('handles numbers between 100 and 999', () => {
    expect(convertNumerals(100)).toBe('one hundred');
    expect(convertNumerals(105)).toBe('one hundred five');
    expect(convertNumerals(255)).toBe('two hundred fifty-five');
    expect(convertNumerals(400)).toBe('four hundred');
    expect(convertNumerals(820)).toBe('eight hundred twenty');
    expect(convertNumerals(999)).toBe('nine hundred ninety-nine');
  });

  it('inserts type at the end', () => {
    expect(convertNumerals(100, 'thousand')).toBe('one hundred thousand');
    expect(convertNumerals(356, 'billion')).toBe('three hundred fifty-six billion');
  });

  it('handles large numbers', () => {
    expect(convertNumerals(123456789)).toBe('one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine');
    expect(convertNumerals(25145856332600)).toBe('twenty-five trillion one hundred forty-five billion eight hundred fifty-six million three hundred thirty-two thousand six hundred');
    expect(convertNumerals(2000005)).toBe('two million five');
  });
});
