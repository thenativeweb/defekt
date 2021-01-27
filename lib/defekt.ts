import { CustomError } from './CustomError';
import { ErrorConstructor } from './ErrorConstructor';
import { formatErrorMessage } from './formatErrorMessage';

const defekt = function <TErrorName extends string>(
  errorName: TErrorName
): ErrorConstructor<TErrorName> {
  return class extends Error implements CustomError<TErrorName> {
    public name: TErrorName = errorName;

    public cause?: unknown;

    public data?: any;

    public constructor (
      message?: string,
      { cause, data }: {
        cause?: unknown;
        data?: any;
      } = {}
    ) {
      super(message ?? `${formatErrorMessage({ errorName })}`);

      this.cause = cause;
      this.data = data;
    }
  };
};

export {
  defekt
};
