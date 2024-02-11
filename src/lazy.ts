import { IterableFold, IterablePipe } from "./types";

class LazySeq<T> implements Iterable<T> {
  #source: Iterable<T>;
  /** @internal */
  constructor(source: Iterable<T>) {
    this.#source = source;
  }

  pipe<U>(fn: IterablePipe<T, U>): LazySeq<U> {
    return new LazySeq(fn(this.#source));
  }

  fold<U>(fn: IterableFold<T, U>): U {
    return fn(this.#source);
  }

  [Symbol.iterator]() {
    return this.#source[Symbol.iterator]();
  }
}

export type { LazySeq };
export const lazy = <T>(source: Iterable<T>): LazySeq<T> => new LazySeq(source);
