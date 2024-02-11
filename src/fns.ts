import { IterableFold, IterablePipe } from "./types";

/**
 * Transforms each value of the iterable into another value, one at a time.
 *
 * @template T The type of the items in the source sequence.
 * @template U The type of the items in the new sequence.
 *
 * @group Pipes
 */
export const map = <T, U>(fn: (value: T) => U): IterablePipe<T, U> =>
  function* (source) {
    for (const value of source) yield fn(value);
  };

/**
 * Lets the values of the iterable pass through until a condition is met.
 * The first value that doesn't meet the condition will stop the iteration.
 *
 * @template T The type of the items in the source sequence.
 *
 * @group Pipes
 */
export const takeWhile = <T>(fn: (value: T) => boolean): IterablePipe<T, T> =>
  function* (source) {
    for (const value of source) {
      if (!fn(value)) return;
      yield value;
    }
  };

/**
 * Gets the last value of the iterable.
 *
 * @template T The type of the items in the source sequence.
 *
 * @group Folds
 */
export const last =
  <T>(): IterableFold<T, T | undefined> =>
  (source) => {
    let lastValue: T | undefined = undefined;
    for (const value of source) lastValue = value;
    return lastValue;
  };

/**
 * Transforms each value of the iterable into an iterable themselves, one at a time.
 * The resulting Iterable will give you the values of the first iterable, then the second, and so on.
 *
 * @template T The type of the items in the source sequence.
 *
 * @group Pipes
 */
export const flatMap = <T, U>(
  fn: (value: T) => Iterable<U>,
): IterablePipe<T, U> =>
  function* (source) {
    for (const value of source) yield* fn(value);
  };

/**
 * Reduces the iterable into a single value, same as
 * [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
 *
 * @template T The type of the items in the source sequence.
 *
 * @group Folds
 */
export const reduce =
  <T, U>(fn: (acc: U, value: T) => U, initial: U): IterableFold<T, U> =>
  (source) => {
    let acc = initial;
    for (const value of source) acc = fn(acc, value);
    return acc;
  };
