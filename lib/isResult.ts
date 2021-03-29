import { Result } from './Result';

const isResult = function (value: any): value is Result<any, any> {
  return typeof value === 'object' && value !== null &&
        Object.keys(value).length === 6 &&
        ('error' in value || 'value' in value) &&
        'hasError' in value && typeof value.hasError === 'function' &&
        'hasValue' in value && typeof value.hasValue === 'function' &&
        'unwrapOrThrow' in value && typeof value.unwrapOrThrow === 'function' &&
        'unwrapOrElse' in value && typeof value.unwrapOrElse === 'function' &&
        'unwrapOrDefault' in value && typeof value.unwrapOrDefault === 'function';
};

export {
  isResult
};
