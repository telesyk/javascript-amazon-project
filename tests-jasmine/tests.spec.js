import { convertCentToDollar } from "../scripts/utils.js";

describe('convertCentToDollar return value in dollars equivalent', () => {
  it('should take value "0" and return equivalent "0.00"', () => {
    expect(convertCentToDollar(0)).toEqual('0.00');
  });

  it('should take value "0.1" and return equivalent "0.00"', () => {
    expect(convertCentToDollar(0.1)).toEqual('0.00');
  });

  it('should take value "2000.5" and return equivalent "20.01"', () => {
    expect(convertCentToDollar(2000.5)).toEqual('20.01');
  });
});