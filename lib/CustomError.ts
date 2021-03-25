interface CustomError<TErrorName extends string = string> extends Error {
  code: TErrorName;
  message: string;
  cause?: unknown;
  data?: any;
}

export type {
  CustomError
};
