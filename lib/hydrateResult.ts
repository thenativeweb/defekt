import { error, Result, value } from './Result';

const hydrateResult = function ({ rawResult }: {
  rawResult: { value?: any } | { error: any };
}): Result<any, any> {
  if ('value' in rawResult) {
    return value(rawResult.value);
  }
  if ('error' in rawResult) {
    return error(rawResult.error);
  }

  return value();
};

export {
  hydrateResult
};
