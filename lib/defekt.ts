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
  return class extends CustomError<TErrorCode> {
    public static code: TErrorCode = code;

    public constructor (
      messageOrMetadata: string | {
        cause?: unknown;
        data?: any;
        message?: string;
      } = {}
    ) {
      super({
        code,
        message: typeof messageOrMetadata === 'string' ?
          messageOrMetadata :
          messageOrMetadata.message ?? defaultMessage ?? `${formatErrorMessage({ code })}`,
        cause: typeof messageOrMetadata === 'string' ? undefined : messageOrMetadata.cause,
        data: typeof messageOrMetadata === 'string' ? undefined : messageOrMetadata.data
      });
    }
  };
};

export {
  defekt
};
