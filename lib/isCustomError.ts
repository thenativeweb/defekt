import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { isError } from './isError';

const isCustomError = function <TErrorName extends string>(
  ex: any,
  errorType?: CustomErrorConstructor<TErrorName>
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
