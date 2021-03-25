import { assert } from 'assertthat';
import { formatErrorMessage } from '../../lib/formatErrorMessage';

suite('formatErrorMessage', (): void => {
  test('contains the human readable error code if no message was given.', async (): Promise<void> => {
    const code = 'InvalidOperation';
    const errorMessage = formatErrorMessage({ code });

    assert.that(errorMessage).is.equalTo('Invalid operation.');
  });

  test('contains the human readable error code for longer codes.', async (): Promise<void> => {
    const code = 'LongerErrorNameWithMultipleWords';
    const errorMessage = formatErrorMessage({ code });

    assert.that(errorMessage).is.equalTo('Longer error name with multiple words.');
  });
});
