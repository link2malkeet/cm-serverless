class BaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}
class HttpError extends BaseError {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export { HttpError };
