const errorHandler = (req, res, next) => {
  return res.status(404).json({ message: "Bad Request, Nothing found." });
};
module.exports = errorHandler;
