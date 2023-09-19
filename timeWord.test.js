const timeWord = require('./timeWord');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });

  test('returns noon', () => {
    expect(timeWord('12:00')).toEqual('noon');
  });

  test('returns midnight', () => {
    expect(timeWord('00:00')).toEqual('midnight');
  });

  test("converts to 12h from 24h, :00 = o'clock", () => {
    expect(timeWord('23:00')).toEqual("eleven o'clock pm");
  });

  test('hour and minutes < 10', () => {
    expect(timeWord('01:01')).toEqual('one oh one am');
  });

  test('hours > 10, minutes < 20', () => {
    expect(timeWord('12:19')).toEqual('twelve nineteen pm');
  });

  test('00: = twelve, minutes > 20', () => {
    expect(timeWord('00:31')).toEqual('twelve thirty one am');
  });
});