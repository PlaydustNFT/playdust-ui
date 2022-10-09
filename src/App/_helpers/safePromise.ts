import logger from './logger';

function safePromise<T>(
  promise: Promise<T>,
  passthrough: true
): Promise<T | void>;
function safePromise<T>(promise: Promise<T>, passthrough: false): void;
function safePromise<T>(promise: Promise<T>): void;
function safePromise<T>(promise: Promise<T>, passthrough?: boolean) {
  const caught = promise.catch((e: Error) => {
    logger('SafePromise Caught', e);
  });
  if (passthrough) {
    return caught;
  }
}

export default safePromise;
