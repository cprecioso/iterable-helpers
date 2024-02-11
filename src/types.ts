/** Base type for a function that transforms one iterable into another */
export type IterablePipe<T, U> = (source: Iterable<T>) => Iterable<U>;

/** Base type for a function that transforms one iterable into a single naked value */
export type IterableFold<T, U> = (source: Iterable<T>) => U;
