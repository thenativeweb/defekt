const isError = function (ex: any): ex is Error {
  return (
    typeof ex === 'object' &&
    ex !== null &&
    'message' in ex && typeof ex.message === 'string' &&
    'name' in ex && typeof ex.name === 'string'
  );
};

export { isError };
