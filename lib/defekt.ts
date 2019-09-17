import humanizeString from 'humanize-string';

export interface CustomError extends Error {
  name: string;
  code: string;
  message: string;
  cause?: Error;
}

type ErrorConstructors<TError> = {
  [TKey in keyof TError]: new(message?: string, cause?: Error) => CustomError
};

const defekt = function <TErrorDefinition extends {
  [ key: string ]: { code?: string };
}> (errorDefinitions: TErrorDefinition): ErrorConstructors<TErrorDefinition> {
  const errors: Partial<ErrorConstructors<TErrorDefinition>> = {};

  /* eslint-disable guard-for-in */
  for (const errorName in errorDefinitions) {
    const errorDefinition = errorDefinitions[errorName];

    if (!errorDefinition) {
      continue;
    }

    const { code = `E${errorName.toUpperCase()}` } = errorDefinition;

    errors[errorName] = class extends Error implements CustomError {
      public name: string;

      public code: string;

      public message: string;

      public cause?: Error;

      /* eslint-disable default-param-last */
      public constructor (message = `${humanizeString(errorName)}.`, cause?: Error) {
        /* eslint-enable default-param-last */
        super();

        this.name = errorName;
        this.code = code;
        this.message = message;
        this.cause = cause;
      }
    };
  }
  /* eslint-enable guard-for-in */

  return errors as ErrorConstructors<TErrorDefinition>;
};

export default defekt;
