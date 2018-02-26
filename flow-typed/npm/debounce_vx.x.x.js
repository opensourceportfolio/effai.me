declare module 'debounce' {
  /**
   * Debounce execution of a function. Debouncing, unlike throttling, guarantees that a function is only executed a single time,
   * either at the very beginning of a series of calls, or at the very end.
   */
  declare function debounce<T>(callback: () => T, delay: number): () => T;
}
