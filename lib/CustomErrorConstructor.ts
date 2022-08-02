import { CustomError } from './CustomError';

interface CustomErrorConstructor<TDataType = any, TErrorCode extends string = string> {
  new(
    parameters?: string | { cause?: Error; data?: TDataType; message?: string }
  ): CustomError<TDataType, TErrorCode>;

  code: string;
}

export type {
  CustomErrorConstructor
};
