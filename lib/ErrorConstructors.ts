import { CustomError } from './CustomError';

interface ErrorConstructor {
  new(message?: string, { cause, data }?: {
    cause?: Error;
    data?: any;
  }): CustomError;

  code: string;
}

export type ErrorConstructors<TError> = {
  [TKey in keyof TError]: ErrorConstructor
};
