const UnknownEndpoint = (req, res) => {
  res.status(404).json({ message: "NOTHING FOUND" });
};
const ErrorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(error.errors)
        .map((x) => x.message)
        .join(" | "),
    });
  } else if (error.name === "SyntaxError") {
    return res.status(400).json({ message: "Bad request" });
  } else if (
    error.name === "MongooseError" &&
    error.message.includes("Username Exists")
  ) {
    return res.status(400).json({ message: "User Already Exists" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid Token" });
  }
  next(error);
};
const extractToken = (req, res, next) => {
  const token = req.get("authorization");
  req.token = token.includes("Bearer ") ? token.replace("Bearer ", "") : null;
  console.log(req.token, "HAHA");
  next();
};
module.exports = { ErrorHandler, UnknownEndpoint, extractToken };
