import { CustomError } from './CustomError';

const isCustomError = function (ex: any): ex is CustomError {
  return typeof ex === 'object' &&
      ex !== null &&
     'name' in ex && typeof ex.name === 'string' &&
     'code' in ex && typeof ex.code === 'string' &&
     'message' in ex && typeof ex.message === 'string';
};

export { isCustomError };
