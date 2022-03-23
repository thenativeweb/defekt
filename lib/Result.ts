import { defekt } from './defekt';

class ResultDoesNotContainError extends defekt({ code: 'ResultDoesNotContainError' }) {}

interface ResultBase<TValue, TError extends Error> {
  hasError: () => this is ResultError<TValue, TError>;
  hasValue: () => this is ResultValue<TValue, TError>;

  unwrapOrThrow: (errorTransformer?: (err: TError) => Error) => TValue;
  unwrapOrElse: (handleError: (error: Error) => TValue) => TValue;
  unwrapOrDefault: <TDefault = TValue>(defaultValue: TDefault) => TValue | TDefault;

  unwrapErrorOrThrow: () => TError;
}

interface ResultError<TValue, TError extends Error> extends ResultBase<TValue, TError> {
  error: TError;
}

const error = function <TValue, TError extends Error>(err: TError): ResultError<TValue, TError> {
  return {
    hasError (): boolean {
      return true;
    },
    hasValue (): boolean {
      return false;
    },
    unwrapOrThrow (errorTransformer?: (err: TError) => Error): never {
      if (errorTransformer) {
        throw errorTransformer(err);
      }
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw err;
    },
    unwrapOrElse (handleError: (error: TError) => TValue): TValue {
      return handleError(err);
    },
    unwrapOrDefault <TDefault = TValue>(defaultValue: TDefault): TDefault {
      return defaultValue;
    },
    unwrapErrorOrThrow (): TError {
      return err;
    },
    error: err
  };
};

interface ResultValue<TValue, TError extends Error> extends ResultBase<TValue, TError> {
  value: TValue;
}

const value: {
  <TValue extends undefined, TError extends Error>(): ResultValue<TValue, TError>;
  <TValue, TError extends Error>(value: TValue): ResultValue<TValue, TError>;
} = function <TValue, TError extends Error>(val?: TValue): ResultValue<TValue | undefined, TError> {
  return {
    hasError (): boolean {
      return false;
    },
    hasValue (): boolean {
      return true;
    },
    unwrapOrThrow (): TValue | undefined {
      return val;
    },
    unwrapOrElse (): TValue | undefined {
      return val;
    },
    unwrapOrDefault (): TValue | undefined {
      return val;
    },
    unwrapErrorOrThrow (): TError {
      throw new ResultDoesNotContainError();
    },
    value: val
  };
};

type Result<TValue, TError extends Error> = ResultValue<TValue, TError> | ResultError<TValue, TError>;

export type {
  ResultValue,
  ResultError,
  Result
};

export {
  ResultDoesNotContainError,

  value,
  error
};
