import { cn } from '@/lib/utils';

describe('Utils', () => {
  test('cn function merges classes correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  test('cn function handles conditional classes', () => {
    expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3');
  });

  test('cn function handles undefined values', () => {
    expect(cn('class1', undefined, 'class2')).toBe('class1 class2');
  });
});