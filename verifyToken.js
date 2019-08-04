const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //get the token
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ message: "Access Denied !" });
  //verify the token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ error });
  }
};
