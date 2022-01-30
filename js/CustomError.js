class LoadingDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LoadingDataError';
  }
}

class CreateAdvertError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CreateAdvertError';
  }
}

export { LoadingDataError, CreateAdvertError };
