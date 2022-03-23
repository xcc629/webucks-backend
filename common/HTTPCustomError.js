const HTTPCustomError = (message, codeNumber) => {
  const error = new Error(message);
  error.statusCode = codeNumber;
  return error;
};

module.exports = HTTPCustomError;
