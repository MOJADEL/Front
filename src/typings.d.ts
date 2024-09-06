declare global {
  interface Blob {
    stream(): ReadableStream<any>;
  }
}