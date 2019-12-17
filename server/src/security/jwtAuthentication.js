import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const secretCode = 'kayatoast';

const JWTAuthentication = (req, res, next) => {
  const token = (req.header('x-access-token') || req.query.token);

  if (!token) {
    return res.status(403).json({
      status: 403,
      success: false,
      message: 'Forbidden You Need a JsonWwpToken',
    });
  }

  jwt.verify(token, secretCode, (err, decode) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'check token refresh',
      });
    } else {
      console.log('decode =', decode);
      next();
    }
  });
};

export default JWTAuthentication;
