import { CustomError } from './CustomError';

type ErrorConstructor<TErrorName extends string> = new(
  parameters?: string | { cause?: unknown; data?: any; message?: string }
) => CustomError<TErrorName>;

export type {
  ErrorConstructor
};
