const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //get the token
 
  if (!req.headers.authorization) return res.status(401).send({ message: "Access Denied !" });
  const token =req.headers.authorization.split(' ')[1];
  if(token === 'null') return res.status(401).send({ message: "Access Denied !" });

  //verify the token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ error });
  }
};
