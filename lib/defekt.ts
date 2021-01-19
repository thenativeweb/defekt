import { CustomError } from './CustomError';
import { ErrorConstructors } from './ErrorConstructors';
import { formatErrorMessage } from './formatErrorMessage';

const defekt = function <TErrorDefinition extends Record<string, { code?: string }>>
(errorDefinitions: TErrorDefinition): ErrorConstructors<TErrorDefinition> {
  const errors: Partial<ErrorConstructors<TErrorDefinition>> = {};

  /* eslint-disable guard-for-in */
  for (const errorName in errorDefinitions) {
    const errorDefinition = errorDefinitions[errorName];

    const { code = `E${errorName.toUpperCase()}` } = errorDefinition;

    errors[errorName] = class extends Error implements CustomError {
      public name: string;

      public code: string;

      public message: string;

      public cause?: unknown;

      public data?: any;

      public static code: string = code;

      /* eslint-disable default-param-last */
      public constructor (message = formatErrorMessage({ errorName }), {
        cause,
        data
      }: {
        cause?: unknown;
        data?: any;
      } = {}) {
        /* eslint-enable default-param-last */
        super();

        this.name = errorName;
        this.code = code;
        this.message = message;
        this.cause = cause;
        this.data = data;
      }
    };
  }
  /* eslint-enable guard-for-in */

  return errors as ErrorConstructors<TErrorDefinition>;
};

export { defekt };
