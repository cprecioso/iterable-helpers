export type IterablePipe<T, U> = (source: Iterable<T>) => Iterable<U>;
export type IterableFold<T, U> = (source: Iterable<T>) => U;
