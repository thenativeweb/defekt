interface ResultBase<TValue, TError extends Error> {
  isFail: () => this is Fail<TError>;
  isOkay: () => this is Okay<TValue>;

  unpackOrCrash: (handleError?: (oldEx: Error) => Error) => TValue;
  unpackOrDefault: (defaultValue: TValue) => TValue;
}

interface Fail<TError extends Error> extends ResultBase<any, TError> {
  isFailed: true;
  error: TError;
}

const fail = function <TError extends Error>(error: TError): Fail<TError> {
  return {
    isFail (): boolean {
      return true;
    },
    isOkay (): boolean {
      return false;
    },
    unpackOrCrash (handleError): never {
      // eslint-disable-next-line unicorn/prefer-ternary
      if (handleError) {
        throw handleError(error);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw error;
      }
    },
    unpackOrDefault <TValue>(defaultValue: TValue): TValue {
      return defaultValue;
    },
    isFailed: true,
    error
  };
};

interface Okay<TValue> extends ResultBase<TValue, any> {
  isFailed: false;
  value: TValue;
}

const okay: {
  <TValue extends undefined>(): Okay<TValue>;
  <TValue>(value: TValue): Okay<TValue>;
} = function <TValue>(value?: TValue): Okay<TValue | undefined> {
  return {
    isFail (): boolean {
      return false;
    },
    isOkay (): boolean {
      return true;
    },
    unpackOrCrash (): TValue | undefined {
      return value;
    },
    unpackOrDefault (): TValue | undefined {
      return value;
    },
    isFailed: false,
    value
  };
};

type Result<TValue, TError extends Error> = Okay<TValue> | Fail<TError>;

export type {
  Okay,
  Fail,
  Result
};

export {
  okay,
  fail
};
