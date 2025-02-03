const UnknownEndpoint = (req, res) => {
  return res.status(404).json({ message: "Unknown URL." });
};
const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError")
    return res.status(404).json({ message: "Malformatted ID" });
  else if (error.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(error.errors)
        .map((x) => x.message)
        .join(" "),
    });
  }
  next(error);
};

module.exports = { UnknownEndpoint, errorHandler };
