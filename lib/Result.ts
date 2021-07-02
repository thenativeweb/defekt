interface ResultBase<TValue, TError extends Error> {
  hasError: () => this is ResultError<TError>;
  hasValue: () => this is ResultValue<TValue>;

  unwrapOrThrow: (errorTransformer?: (err: TError) => Error) => TValue;
  unwrapOrElse: (handleError: (error: Error) => TValue) => TValue;
  unwrapOrDefault: (defaultValue: TValue) => TValue;
}

interface ResultError<TError extends Error> extends ResultBase<unknown, TError> {
  error: TError;
}

const error = function <TError extends Error>(err: TError): ResultError<TError> {
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
    unwrapOrElse<TValue> (handleError: (error: TError) => TValue): TValue {
      return handleError(err);
    },
    unwrapOrDefault<TValue> (defaultValue: TValue): TValue {
      return defaultValue;
    },
    error: err
  };
};

interface ResultValue<TValue> extends ResultBase<TValue, Error> {
  value: TValue;
}

const value: {
  <TValue extends undefined>(): ResultValue<TValue>;
  <TValue>(value: TValue): ResultValue<TValue>;
} = function <TValue>(val?: TValue): ResultValue<TValue | undefined> {
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

type Result<TValue, TError extends Error> = ResultValue<TValue> | ResultError<TError>;

export type {
  ResultValue,
  ResultError,
  Result
};

export {
  value,
  error
};
