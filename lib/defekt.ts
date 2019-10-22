import { CustomError } from './CustomError';
import { ErrorConstructors } from './ErrorConstructors';
import humanizeString from 'humanize-string';

const defekt = function <TErrorDefinition extends {
  [ key: string ]: { code?: string };
}> (errorDefinitions: TErrorDefinition): ErrorConstructors<TErrorDefinition> {
  const errors: Partial<ErrorConstructors<TErrorDefinition>> = {};

  /* eslint-disable guard-for-in */
  for (const errorName in errorDefinitions) {
    const errorDefinition = errorDefinitions[errorName];

    const { code = `E${errorName.toUpperCase()}` } = errorDefinition;

    errors[errorName] = class extends Error implements CustomError {
      public name: string;

      public code: string;

      public message: string;

      public cause?: Error;

      public data?: any;

      /* eslint-disable default-param-last */
      public constructor (message = `${humanizeString(errorName)}.`, {
        cause,
        data
      }: {
        cause?: Error;
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

export default defekt;
