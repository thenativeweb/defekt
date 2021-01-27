import { CustomError } from './CustomError';
import { ErrorConstructor } from './ErrorConstructor';
import { isError } from './isError';

const isCustomError = function <TErrorName extends string>(
  ex: any,
  errorType?: ErrorConstructor<TErrorName>
): ex is CustomError<TErrorName> {
  return (
    isError(ex) &&
        (errorType === undefined || ex.name === errorType.name)
  );
};

export {
  isCustomError
};
