/** @format */
import { uploadTemplate, mailTemplate } from "../utils/awsServices";
import userSchema from "../models/UserModel";
import { nanoid } from "nanoid";
const generator = require("generate-password");
import { hashPassword } from "../utils/bcrypt";

//@desc   Current Admin
//@routes POST /api/admin/isvalid
//@access PUBLIC
export const currentAdmin = async (req, res) => {
  res.json({ success: true });
};

//@desc   Upload Image
//@routes POST /api/admin/instructor/upload-image
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

    const data = uploadTemplate(params);
    res.json(data);
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
      length: 10,
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
              <h1>Hey ${name} you are successfully registered as an instructor.</h1>
              <h2 style="color:red;">Your Password is - ${password}</h2>
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
