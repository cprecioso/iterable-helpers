import { IterableFold, IterablePipe } from "./types";

/**
 * A lazy sequence. Its steps are only executed when the sequence is iterated.
 * Each item goes through the full pipeline before the next item is processed.
 *
 * It doesn't expose the constructor, you should create a {@link LazySeq} using
 * the {@link lazy} function.
 *
 * The sequence is immutable, so each operation returns a new sequence. It is an
 * [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)
 * itself, so you can `for..of` over it, or use the spread operator to convert
 * it to an array.
 *
 * @remark
 * This is just a convenient wrapper around iterables that allows you to chain
 * operations together with a nice syntax. You can use the rest of the library
 * in the {@link pipe} and {@link fold} methods.
 *
 * @template T The type of the items in the sequence.
 *
 * @group Lazy
 *
 * @example
 * ```ts
 * import * as it from "@cprecioso/iterable-helpers"
 *
 * const result =
 *   it.lazy([1, 2, 3])
 *     .pipe(it.map(x => x * 2))
 *     .fold(it.last())
 * ```
 */
class LazySeq<T> implements Iterable<T> {
  #source: Iterable<T>;
  /** @internal */
  constructor(source: Iterable<T>) {
    this.#source = source;
  }

  /**
   * Feeds the iterable into a function that transforms it into another iterable.
   * The result is a new {@link LazySeq} that will iterate over the new iterable.
   *
   * @template U The type of the items in the new sequence.
   */
  pipe<U>(fn: IterablePipe<T, U>): LazySeq<U> {
    return new LazySeq(fn(this.#source));
  }

  /**
   * Feeds the iterable into a function that reduces it into a single value.
   * The result is the value itself, **NOT** wrapped by a {@link LazySeq}.
   *
   * @template U The type of the result.
   */
  fold<U>(fn: IterableFold<T, U>): U {
    return fn(this.#source);
  }

  /**
   * Connects with the underlying iterable's `Iterator`.
   *
   * This way we can conform to `Iterable`.
   */
  [Symbol.iterator]() {
    return this.#source[Symbol.iterator]();
  }
}

export type { LazySeq };

/**
 * Creates a {@link LazySeq}
 *
 * @group Lazy
 */
export const lazy = <T>(source: Iterable<T>): LazySeq<T> => new LazySeq(source);
