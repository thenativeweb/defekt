const formatErrorMessage = function ({ errorName }: {
  errorName: string;
}): string {
  const almostFormattedErrorMessage = errorName.
    split('').
    map((character: string, index: number): string => {
      if (index === 0) {
        return character.toUpperCase();
      }

      if (character.toUpperCase() === character) {
        return ` ${character.toLowerCase()}`;
      }

      return character;
    }).
    join('');

  return `${almostFormattedErrorMessage}.`;
};

export {
  formatErrorMessage
};
