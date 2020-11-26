import { CustomError } from './CustomError';

interface ErrorConstructor {
  new(message?: string, { cause, data }?: {
    cause?: unknown;
    data?: any;
  }): CustomError;

  code: string;
}

export type ErrorConstructors<TError> = {
  [TKey in keyof TError]: ErrorConstructor
};
