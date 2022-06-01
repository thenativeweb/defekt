import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { defekt } from './defekt';
import { ensureUnknownIsError } from './ensureUnknownIsError';
import { hydrateResult } from './hydrateResult';
import { isCustomError } from './isCustomError';
import { isError } from './isError';
import { isResult } from './isResult';
import { error, Result, ResultDoesNotContainError, value } from './Result';
import { hydrateCustomError, HydratingErrorFailed } from './hydrateCustomError';

export {
  CustomError,
  defekt,
  ensureUnknownIsError,
  error,
  hydrateCustomError,
  HydratingErrorFailed,
  hydrateResult,
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
