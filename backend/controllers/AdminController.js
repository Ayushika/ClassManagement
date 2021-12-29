/** @format */
import { mailTemplate } from "../utils/awsServices";
import userSchema from "../models/UserModel";
import batchSchema from "../models/BatchModel";
import { nanoid } from "nanoid";
const generator = require("generate-password");
import { hashPassword } from "../utils/bcrypt";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

//@desc   Current Admin
//@routes POST /api/admin/isvalid
//@access PUBLIC
export const currentAdmin = async (req, res) => {
  res.json({ success: true });
};

//@desc   Upload Image
//@routes POST /api/admin/upload-image
//@access PRIVATE
export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).send("No Image");
    }

    //prepare the image

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    //image params prepare the image just keep the binary data remove the data type store images using base64 format.
    const params = {
      Bucket: "class-room",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).send("Error,Please Try Again");
      }
      res.json(data);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Register Instructor
//@routes POST /api/admin/instructor/register
//@access PRIVATE
export const registerInstructor = async (req, res) => {
  try {
    const { name, email, phone, image } = req.body;
    const password = generator.generate({
      length: 8,
      numbers: true,
      uppercase: false,
    });
    const hashedPassword = await hashPassword(password);
    const user = await new userSchema({
      name,
      email,
      phone,
      role: "Instructor",
      image,
      password: hashedPassword,
    }).save();

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
              <h2>Hey ${name}</h2> 
              <p>Hope this email finds you well. You are successfully registered as an instructor.</p>
              <p>Your credentials are : </p>
              <p>Email - <span style="color:red;">${email} </span></p> 
              <p>Password - <span style="color:red;">${password} </span></p> 
              <i>ClassRoom</i>
              </html>
              `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Registered Successfully",
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Try Again,Please check all fields");
  }
};

//@desc   Register Student
//@routes POST /api/admin/student/register
//@access PRIVATE
export const registerStudent = async (req, res) => {
  try {
    const { name, email, phone, image, institute, section, year, branch } =
      req.body;

    const batch = await batchSchema
      .findOne({
        institute: institute,
        section: section,
        year: year,
        branch: branch,
      })
      .exec();

    const password = generator.generate({
      length: 8,
      numbers: true,
      uppercase: false,
    });
    const hashedPassword = await hashPassword(password);
    const user = await new userSchema({
      name,
      email,
      phone,
      role: "Student",
      image,
      batch: batch._id,
      password: hashedPassword,
    }).save();

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
                <h2>Hey ${name}</h2>
                <p>Hope this email finds you well. You are successfully registered as a student.</p>
                <p>Your credentials are : </p>
                <p>Email - <span style="color:red;">${email} </span></p>
                <p>Password - <span style="color:red;">${password} </span></p>
                <i>ClassRoom</i>
                </html>
                `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Registered Successfully",
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error Try Again,Please check all fields");
  }
};

//@desc   Display Student
//@routes POST /api/admin/student/display
//@access PRIVATE
export const displayStudent = async (req, res) => {
  const students = await userSchema
    .find({ role: "Student" })
    .populate("batch")
    .exec();
  res.json(students);
};

//@desc   Display Instructor
//@routes POST /api/admin/instructor/display
//@access PRIVATE
export const displayInstructor = async (req, res) => {
  const instructors = await userSchema.find({ role: "Instructor" }).exec();
  res.json(instructors);
};
