import { describe, it, expect } from 'vitest';
import { deepCopy } from '#/utils/helpers/deep-copy';

describe('deepCopy', () => {
  it('should create a deep copy of an array', () => {
    const array = [1, 2, 3];
    const copy = deepCopy(array);

    expect(copy).toEqual(array);
    expect(copy).not.toBe(array);
  });

  it('should create a deep copy of an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const copy = deepCopy(obj);

    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
  });

  it('should create a deep copy of nested objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const copy = deepCopy(obj);

    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
    expect(copy.a).not.toBe(obj.a);
    expect(copy.a.b).not.toBe(obj.a.b);
  });
});
