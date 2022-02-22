import { defekt } from './defekt';
import { error, Result, value } from './Result';

class HydratingResultFailed extends defekt({ code: 'HydratingResultFailed' }) {}

const hydrateResult = function<TValue, TError extends Error> ({ rawResult }: {
  rawResult: { value: TValue } | { error: TError };
}): Result<Result<TValue, TError>, HydratingResultFailed> {
  if ('value' in rawResult) {
    return value(value(rawResult.value) as Result<TValue, TError>);
  }
  if ('error' in rawResult) {
    return value(error(rawResult.error) as Result<TValue, TError>);
  }

  return error(new HydratingResultFailed());
};

export {
  hydrateResult
};
