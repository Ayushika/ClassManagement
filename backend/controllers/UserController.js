import userSchema from "../models/UserModel";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import generateToken from "../utils/generateToken";

//@desc   Register User
//@routes POST /api/user/register
//@access PRIVATE/ADMIN
export const registerUser = async (req, res) => {
  const name = "Ayushika";
  const email = "ayushikabansal7890@gmail.com";
  const phone = 7009904967;
  const role = "Admin";
  const password = "Raghav1@";

  const hashedPassword = await hashPassword(password);
  const user = await new userSchema({
    name,
    email,
    phone,
    role,
    password: hashedPassword,
  }).save();
  res.json(user);
};

//@desc   Login User
//@routes POST /api/user/login
//@access PUBLIC
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(400).send("User Not Found!");
  }

  const isPasswordMatched = await comparePassword(password, user.password);
  if (!isPasswordMatched) {
    return res.status(400).send("Invalid Credentials");
  }
  const token = generateToken(user._id);

  // send token in cookie
  // when user successfully logs in server send the cookie response so this token will be accessible for the browser so browser whenever making request to backend this token is automatically included.
  res.cookie("token", token, {
    httpOnly: true,
    // secure: true // only work on https in production with ssl certificates
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
    image: user.image,
    phone: user.phone,
  });
};
