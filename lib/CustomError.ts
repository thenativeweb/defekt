export interface CustomError extends Error {
  name: string;
  code: string;
  message: string;
  cause?: Error;
  data?: any;
}
