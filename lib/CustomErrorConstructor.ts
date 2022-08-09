import { CustomError } from './CustomError';

interface CustomErrorConstructor<TData = any, TErrorCode extends string = string> {
  new(
    parameters?: string | { cause?: Error; data?: TData; message?: string }
  ): CustomError<TData, TErrorCode>;

  code: string;
}

export type {
  CustomErrorConstructor
};
