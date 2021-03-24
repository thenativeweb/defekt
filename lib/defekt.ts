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
      messageOrMetadata: string | {
        cause?: unknown;
        data?: any;
        message?: string;
      } = {}
    ) {
      super(
        typeof messageOrMetadata === 'string' ?
          messageOrMetadata :
          messageOrMetadata.message ?? `${formatErrorMessage({ errorName })}`
      );

      if (typeof messageOrMetadata !== 'string') {
        this.cause = messageOrMetadata.cause;
        this.data = messageOrMetadata.data;
      }
    }
  };
};

export {
  defekt
};
