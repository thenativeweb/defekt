import { CustomError } from './CustomError';

export type ErrorConstructors<TError> = {
  [TKey in keyof TError]: new(message?: string, { cause, data }?: {
    cause?: Error;
    data?: any;
  }) => CustomError
};
