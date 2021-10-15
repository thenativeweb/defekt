import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { defekt } from './defekt';
import { hydrateResult } from './hydrateResult';
import { isCustomError } from './isCustomError';
import { isError } from './isError';
import { isResult } from './isResult';
import { error, Result, value } from './Result';
import { hydrateCustomError, HydratingErrorFailed } from './hydrateCustomError';

export {
  CustomError,
  defekt,
  error,
  hydrateCustomError,
  HydratingErrorFailed,
  hydrateResult,
  isCustomError,
  isError,
  isResult,
  value
};

export type {
  CustomErrorConstructor,
  Result
};
