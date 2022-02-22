import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { defekt } from './defekt';
import { hydrateCustomError } from './hydrateCustomError';
import { error, Result, value } from './Result';

class HydratingResultFailed extends defekt({ code: 'HydratingResultFailed' }) {}

const hydrateResult = function<TValue, TError extends Error, TPotentialCustomErrorNames extends string = string> ({ rawResult, potentialErrorConstructors }: {
  rawResult: { value: TValue } | { error: TError };
  potentialErrorConstructors?: CustomErrorConstructor<TPotentialCustomErrorNames>[];
}): Result<Result<TValue, TError | CustomError<TPotentialCustomErrorNames>>, HydratingResultFailed> {
  if ('value' in rawResult) {
    return value(value(rawResult.value) as Result<TValue, any>);
  }
  if ('error' in rawResult) {
    let processedError: Error = rawResult.error;

    if (potentialErrorConstructors) {
      const hydrateErrorResult = hydrateCustomError({ rawEx: rawResult.error, potentialErrorConstructors });

      if (hydrateErrorResult.hasError()) {
        return error(new HydratingResultFailed({ cause: hydrateErrorResult.error }));
      }

      processedError = hydrateErrorResult.value;
    }

    return value(error(processedError) as Result<TValue, any>);
  }

  return error(new HydratingResultFailed());
};

export {
  hydrateResult
};
