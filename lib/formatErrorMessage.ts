const formatErrorMessage = function ({ code }: {
  code: string;
}): string {
  const almostFormattedErrorMessage = [ ...code ].
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
