const UnknownEndpoint = (req, res) => {
  res.status(404).json({ message: "NOTHING FOUND" });
};
const ErrorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = { ErrorHandler, UnknownEndpoint };
