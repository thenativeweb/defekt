import { CustomError } from './CustomError';
import { ErrorConstructor } from './ErrorConstructor';
import { formatErrorMessage } from './formatErrorMessage';

const defekt = function <TErrorCode extends string>({
  code,
  defaultMessage
}: {
  code: TErrorCode;
  defaultMessage?: string;
}): ErrorConstructor<TErrorCode> {
  return class extends Error implements CustomError<TErrorCode> {
    public static code: TErrorCode = code;

    public code: TErrorCode = code;

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
          messageOrMetadata.message ?? defaultMessage ?? `${formatErrorMessage({ code })}`
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
