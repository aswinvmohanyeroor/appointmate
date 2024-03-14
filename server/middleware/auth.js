import jwt from "jsonwebtoken";
import dontenv from "dotenv";
dontenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
//   console.log(req.headers);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default authenticateToken;
