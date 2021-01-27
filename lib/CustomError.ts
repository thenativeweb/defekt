interface CustomError<TErrorName extends string = string> extends Error {
  name: TErrorName;
  message: string;
  cause?: unknown;
  data?: any;
}

export type {
  CustomError
};
