import { CustomError } from './CustomError';
import { ErrorConstructor } from './ErrorConstructor';
import { isError } from './isError';

const isCustomError = function <TErrorName extends string>(
  ex: any,
  errorType?: ErrorConstructor<TErrorName>
): ex is CustomError<TErrorName> {
  return (
    isError(ex) &&
      ex instanceof CustomError &&
      (errorType === undefined || ((ex as any).code === errorType.code))
  );
};

export {
  isCustomError
};
