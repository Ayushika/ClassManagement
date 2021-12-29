/** @format */

import userSchema from "../models/UserModel";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import generateToken from "../utils/generateToken";
import { nanoid } from "nanoid";
import { mailTemplate } from "../utils/awsServices";

//@desc   Register User
//@routes POST /api/user/register
//@access PRIVATE/ADMIN
export const registerUser = async (req, res) => {
  const name = "Ayushika";
  const email = "raghav0074.cse19@chitkara.edu.in";
  const phone = 7009904967;
  const role = "Instructor";
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
  try {
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
  } catch (error) {
    console.log(error);
    res.status(400).send("Login Failed");
  }
};

//@desc   Verify Email For Resetting Password
//@routes POST /api/user/verify-email
//@access PUBLIC
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send("User Not Found!");
    }
    const otp = nanoid(6).toUpperCase();
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
            <html>
            <h1>Reset Your Password</h1>
            <p>Use this code</p>
            <h2 style="color:red;">${otp}</h2>
            <i>ClassRoom</i>
            </html>
            `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Otp for Reset Password",
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json(otp);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Try Again");
  }
};

//@desc   Forgot Password
//@routes POST /api/user/forgot-password
//@access PUBLIC
export const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });

    if (!password || password.length < 8)
      return res
        .status(400)
        .send("Password is required and should be min 8 characters long");

    if (!user) {
      return res.status(400).send("Email Not Found");
    }

    const hashedPassword = await hashPassword(password);

    const updateUser = await userSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
                <html>
                <h1>Password Reset Successfully</h1>
                <i>ClassRoom</i>
                </html>
                `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Password Reset",
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json({ success: true });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Try Again");
  }
};

//@desc   Logout User
//@routes POST /api/user/logout
//@access PRIVATE/USER
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Successfully logout" });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error try again!");
  }
};

//@desc   Current User
//@routes POST /api/user/isvalid
//@access PUBLIC
export const currentUser = async (req, res) => {
  const { id } = req.user;
  const user = await userSchema.findById(id).exec();
  if (!user) {
    return res.status(401).send("UnAuthorized");
  }
  res.json({ success: true });
};

//@desc   User Details
//@routes POST /api/user/:id
//@access PRIVATE
export const userDetails = async (req, res) => {
  const { id } = req.params;
  const user = await userSchema.findById(id).select("-password").exec();
  if (!user) {
    return res.status(401).send("User Not Found");
  }
  res.json(user);
};

//@desc   User Update
//@routes POST /api/user/:id
//@access PRIVATE
export const userUpdate = async (req, res) => {
  const { img, name, phone } = req.body;
  const { id } = req.user;
  const user = await userSchema
    .findByIdAndUpdate(id, { image: img, name, phone }, { new: true })
    .select("-password")
    .exec();
  if (!user) {
    return res.status(401).send("User Not Found");
  }
  res.json(user);
};
