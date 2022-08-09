class CustomError<TData = any, TErrorCode extends string = string> extends Error {
  public code: TErrorCode;

  public data?: TData;

  public constructor ({ code, message, cause, data }: {
    code: TErrorCode;
    message: string;
    cause?: Error;
    data?: TData;
  }) {
    super(message);

    this.code = code;
    this.cause = cause;
    this.data = data;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public toJSON (): any {
    const serializableObject: any = {
      name: this.name,
      message: this.message,
      code: this.code,
      stack: this.stack
    };

    try {
      JSON.stringify(this.data);
      serializableObject.data = this.data;
    } catch {
      // If data is not serializable, we want to omit it from the returned object.
    }
    try {
      JSON.stringify(this.cause);
      serializableObject.cause = this.cause;
    } catch {
      // If data is not serializable, we want to omit it from the returned object.
    }

    return serializableObject;
  }
}

export {
  CustomError
};
