interface ResultBase<TValue, TError extends Error> {
  hasError: () => this is ResultError<TValue, TError>;
  hasValue: () => this is ResultValue<TValue, TError>;

  unwrapOrThrow: () => TValue;
  unwrapOrElse: (handleError: (error: Error) => TValue) => TValue;
  unwrapOrDefault: (defaultValue: TValue) => TValue;
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
    unwrapOrThrow (): never {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw err;
    },
    unwrapOrElse (handleError: (error: TError) => TValue): TValue {
      return handleError(err);
    },
    unwrapOrDefault (defaultValue: TValue): TValue {
      return defaultValue;
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
  value,
  error
};
