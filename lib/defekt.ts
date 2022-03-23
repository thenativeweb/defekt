import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { formatErrorMessage } from './formatErrorMessage';

const defekt = function <TErrorCode extends string>({
  code,
  defaultMessage
}: {
  code: TErrorCode;
  defaultMessage?: string;
}): CustomErrorConstructor<TErrorCode> {
  return class extends CustomError<TErrorCode> {
    public static code: TErrorCode = code;

    public constructor (
      messageOrMetadata: string | {
        cause?: Error;
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
