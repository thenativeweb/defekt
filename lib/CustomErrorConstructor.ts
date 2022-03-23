import { CustomError } from './CustomError';

interface CustomErrorConstructor<TErrorName extends string> {
  new(
    parameters?: string | { cause?: Error; data?: any; message?: string }
  ): CustomError<TErrorName>;

  code: string;
}

export type {
  CustomErrorConstructor
};
