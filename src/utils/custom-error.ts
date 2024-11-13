export class CustomError extends Error {
  statusCode: number;
  message: string;
  details: string | null;

  constructor(statusCode: number, message: string, details: string = null) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }

  getResponse() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
    };
  }
}
