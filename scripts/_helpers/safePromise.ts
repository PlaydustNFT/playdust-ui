function safePromise<T>(promise: Promise<T>) {
  promise.catch((e) => {
    console.error('SavePromise Caught', e);
  });
}

export default safePromise;
