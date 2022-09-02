import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { isError } from './isError';

const isCustomError = function <TData, TErrorName extends string>(
  ex: any,
  errorType?: CustomErrorConstructor<TData, TErrorName>
): ex is CustomError<TData, TErrorName> {
  return (
    isError(ex) &&
      ex instanceof CustomError &&
      (errorType === undefined || ((ex as any).code === errorType.code))
  );
};

export {
  isCustomError
};
