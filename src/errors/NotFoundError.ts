export class NotFoundError extends Error {
  public status: number;

  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}
