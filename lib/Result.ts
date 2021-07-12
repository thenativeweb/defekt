interface ResultBase<TValue, TError extends Error> {
  hasError: () => this is ResultError<TError> & ResultBase<any, TError>;
  hasValue: () => this is ResultValue<TValue> & ResultBase<TValue, any>;

  unwrapOrThrow: (errorTransformer?: (err: TError) => Error) => TValue;
  unwrapOrElse: (handleError: (error: Error) => TValue) => TValue;
  unwrapOrDefault: (defaultValue: TValue) => TValue;
}

interface ResultError<TError extends Error> {
  error: TError;
}

const error = function <TError extends Error>(err: TError): ResultError<TError> & ResultBase<any, TError> {
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

interface ResultValue<TValue> {
  value: TValue;
}

const value: {
  <TValue extends undefined>(): ResultValue<TValue> & ResultBase<TValue, any>;
  <TValue>(value: TValue): ResultValue<TValue> & ResultBase<TValue, any>;
} = function <TValue>(val?: TValue): ResultValue<TValue | undefined> & ResultBase<TValue | undefined, any> {
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

type Result<TValue, TError extends Error> = ResultBase<TValue, TError>;

export type {
  ResultValue,
  ResultError,
  Result
};

export {
  value,
  error
};
