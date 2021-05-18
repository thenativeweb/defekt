class CustomError<TErrorName extends string = string> extends Error {
  public code: TErrorName;

  public cause?: unknown;

  public data?: any;

  public constructor ({ code, message, cause, data }: {
    code: TErrorName;
    message: string;
    cause?: unknown;
    data?: any;
  }) {
    super(message);

    this.code = code;
    this.cause = cause;
    this.data = data;
  }
}

export {
  CustomError
};
