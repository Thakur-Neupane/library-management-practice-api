import JWT from "jsonwebtoken";
import { insertToken } from "../models/session/SessionSchema";
import { updateUser } from "../models/user/UserModel";

// Create access JWT
export const signAccessJWT = (payload) => {
  const token = JWT.sign(payload, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "15m",
  });

  insertToken({ token });
  return token;
};

// verify access JWT
export const verifyAccessJWT = (token) => {
  try {
    return JWT.verify (token, process.env.ACCESS_JWT_SECRET)
  } catch (error) {
    console.log(error.message);
    return "Invalid Token";
  }
};

// create refresh JWT
export const signRefreshJWT = ({email})=>{
    |const refreshJWT = JWT.sign({email}, process.env.REFRESH_JWT_SECRET, {
        expiresIn:"30d",
    });
    updateUser({email}, {refreshJWT});
    return refreshJWT;
}
