import { assert } from 'assertthat';
import { formatErrorMessage } from '../../lib/formatErrorMessage';

suite('formatErrorMessage', (): void => {
  test('contains the human readable error name if no message was given.', async (): Promise<void> => {
    const errorName = 'InvalidOperation';
    const errorMessage = formatErrorMessage({ errorName });

    assert.that(errorMessage).is.equalTo('Invalid operation.');
  });

  test('contains the human readable error name for longer names.', async (): Promise<void> => {
    const errorName = 'LongerErrorNameWithMultipleWords';
    const errorMessage = formatErrorMessage({ errorName });

    assert.that(errorMessage).is.equalTo('Longer error name with multiple words.');
  });
});
