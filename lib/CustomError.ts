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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public toJSON (): string {
    return JSON.stringify({
      name: this.name,
      message: this.message,
      code: this.code,
      data: this.data,
      cause: this.cause,
      stack: this.stack
    });
  }
}

export {
  CustomError
};
