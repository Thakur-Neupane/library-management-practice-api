import bcrypt from "bcryptjs";
const saltRound = 15;
export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, saltRound);
};

export const comparePassword = (plainpass, hashPassword) => {
  return bcrypt.compareSync(plainpass, hashPassword);
};
