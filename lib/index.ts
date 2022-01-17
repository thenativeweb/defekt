import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { defekt } from './defekt';
import { isCustomError } from './isCustomError';
import { isError } from './isError';
import { isResult } from './isResult';
import { error, Result, ResultDoesNotContainError, value } from './Result';

export {
  CustomError,
  defekt,
  error,
  isCustomError,
  isError,
  isResult,
  ResultDoesNotContainError,
  value
};

export type {
  CustomErrorConstructor,
  Result
};
