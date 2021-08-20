import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { defekt } from './defekt';
import { isCustomError } from './isCustomError';
import { isError } from './isError';
import { isResult } from './isResult';
import { error, Result, value } from './Result';

export {
  CustomError,
  defekt,
  error,
  isCustomError,
  isError,
  isResult,
  value
};

export type {
  CustomErrorConstructor,
  Result
};
