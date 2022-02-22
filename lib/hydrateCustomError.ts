import { CustomError } from './CustomError';
import { CustomErrorConstructor } from './CustomErrorConstructor';
import { defekt } from './defekt';
import { error, Result, value } from './Result';

class HydratingErrorFailed extends defekt({ code: 'HydratingErrorFailed' }) {}

const hydrateCustomError = function<TPotentialCustomErrorNames extends string = string> ({
  rawEx, potentialErrorConstructors
}: {
  rawEx: any;
  potentialErrorConstructors: CustomErrorConstructor<TPotentialCustomErrorNames>[];
}): Result<CustomError<TPotentialCustomErrorNames>, HydratingErrorFailed> {
  if (typeof rawEx !== 'object' || rawEx === null) {
    return error(new HydratingErrorFailed('The given error is not an object.'));
  }

  if (!('name' in rawEx)) {
    return error(new HydratingErrorFailed('The given error is missing a name.'));
  }
  if (!('code' in rawEx)) {
    return error(new HydratingErrorFailed('The given error is missing a code.'));
  }
  if (!('message' in rawEx)) {
    return error(new HydratingErrorFailed('The given error is missing a message.'));
  }

  const ActualErrorConstructor = potentialErrorConstructors.find(
    (errorContructor): boolean => errorContructor.code === rawEx.code
  );

  if (ActualErrorConstructor === undefined) {
    return error(new HydratingErrorFailed({
      message: 'Could not find an appropriate ErrorConstructor to hydrate the given error.',
      data: { code: rawEx.code }
    }));
  }

  const stack = rawEx?.stack;
  const data = rawEx?.data;
  const cause = rawEx?.cause;

  const hydratedError = new ActualErrorConstructor({ message: rawEx.message, cause, data });

  hydratedError.name = rawEx.name;
  hydratedError.stack = stack;

  return value(hydratedError);
};

export {
  HydratingErrorFailed,

  hydrateCustomError
};
