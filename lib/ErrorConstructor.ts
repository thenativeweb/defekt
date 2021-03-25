import { CustomError } from './CustomError';

interface ErrorConstructor<TErrorName extends string> {
  new(
    parameters?: string | { cause?: unknown; data?: any; message?: string }
  ): CustomError<TErrorName>;

  code: string;
}

export type {
  ErrorConstructor
};
