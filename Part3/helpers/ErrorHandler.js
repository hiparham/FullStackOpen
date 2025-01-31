const errorHandler = (req, res) => {
  return res.status(404).json({ message: "Bad Request, Nothing found." });
};

module.exports = { errorHandler };
