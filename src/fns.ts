import { IterableFold, IterablePipe } from "./types";

export const map = <T, U>(fn: (value: T) => U): IterablePipe<T, U> =>
  function* (source) {
    for (const value of source) yield fn(value);
  };

export const takeWhile = <T>(fn: (value: T) => boolean): IterablePipe<T, T> =>
  function* (source) {
    for (const value of source) {
      if (!fn(value)) return;
      yield value;
    }
  };

export const last =
  <T>(): IterableFold<T, T | undefined> =>
  (source) => {
    let lastValue: T | undefined = undefined;
    for (const value of source) lastValue = value;
    return lastValue;
  };

export const flatMap = <T, U>(
  fn: (value: T) => Iterable<U>,
): IterablePipe<T, U> =>
  function* (source) {
    for (const value of source) yield* fn(value);
  };

export const reduce =
  <T, U>(fn: (acc: U, value: T) => U, initial: U): IterableFold<T, U> =>
  (source) => {
    let acc = initial;
    for (const value of source) acc = fn(acc, value);
    return acc;
  };
