const isError = function (ex: any): ex is Error {
  return typeof ex === 'object' && ex instanceof Error;
};

export { isError };
