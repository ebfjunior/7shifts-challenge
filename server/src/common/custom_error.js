class CustomError extends Error {
  constructor(args) {
    super(args.message);
    Object.assign(this, args);
  }
}

module.exports = CustomError;
