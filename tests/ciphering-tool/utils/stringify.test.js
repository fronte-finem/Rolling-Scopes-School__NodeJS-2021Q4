import { stringify } from '../../../ciphering-tool/utils/stringify.js';

describe('Stringify:', () => {
  it('should convert to string various js-types', () => {
    const numStr = '1234567890987654321';
    expect(stringify(null)).toEqual('null');
    expect(stringify(undefined)).toEqual('undefined');
    expect(stringify(true)).toEqual('true');
    expect(stringify(false)).toEqual('false');
    expect(stringify(NaN)).toEqual('NaN');
    expect(stringify(12345)).toEqual('12345');
    expect(stringify(BigInt(numStr))).toEqual(numStr);
    expect(stringify(numStr)).toEqual(numStr);
    expect(stringify(Symbol('sym'))).toEqual('Symbol(sym)');
    expect(stringify([1, 2, 3])).toEqual('[1,2,3]');
    expect(stringify({ x: 1, y: 2 })).toEqual('{"x":1,"y":2}');
    expect(stringify(stringify)).toEqual(String(stringify));
  });
});
