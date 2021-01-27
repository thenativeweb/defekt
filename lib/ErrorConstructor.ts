import { CustomError } from './CustomError';

type ErrorConstructor<TErrorName extends string> = new(
  message?: string,
  meta?: { cause?: unknown; data?: any }
) => CustomError<TErrorName>;

export type {
  ErrorConstructor
};
