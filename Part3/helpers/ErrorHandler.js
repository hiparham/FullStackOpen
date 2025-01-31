const errorHandler = (error, req, res, next) => {
  return res.status(404).json({ message: "Malformatted ID" });
};

module.exports = { errorHandler };
