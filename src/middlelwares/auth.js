import { findToken } from "../models/session/SessionSchema";
import { getUserByEmail } from "../models/user/UserModel";
import { verifyAccessJWT } from "../utils/jwt";

export const auth = async (req, res, next) => {
  try {
    // receive jwt via authorization header
    const { authorization } = req.headers;

    // verify if jwt is valid i.e no expired, secret key by decoding jwt
    const decoded = verifyAccessJWT(authorization);
    if (decoded?.email) {
      // check if the token exist in the database table
      const tokenObj = await findToken(authorization);
      if (tokenObj?._id) {
        // Extract email from the decoded jwt object
        // get user by email
        const user = await getUserByEmail(decoded.email);

        if (user?._id) {
          // if user exists they are now authorized
          user.password = undefined;
          req.userInfo = user;
          console.log(user);
          return next();
        }
      }
    }
    const error = {
      message: "Unauthorized ",
      status: 403,
    };
  } catch (error) {
    next(error);
  }
};
