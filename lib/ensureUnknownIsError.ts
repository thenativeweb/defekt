import { isError } from './isError';

const ensureUnknownIsError = function ({ error }: { error: any }): Error & { data?: any } {
  if (isError(error)) {
    return error;
  }

  try {
    return new Error(JSON.stringify(error));
  } catch {
    const wrappedError = new Error('See the data property for the original error.') as Error & { data?: any };

    wrappedError.data = error;

    return wrappedError;
  }
};

export {
  ensureUnknownIsError
};
