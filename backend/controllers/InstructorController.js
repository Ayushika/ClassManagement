/** @format */
import courseSchema from "../models/CourseModel";
import batchSchema from "../models/BatchModel";
import userSchema from "../models/UserModel";
import { mailTemplate } from "../utils/awsServices";
import slugify from "slugify";

//@desc   Current Instructor
//@routes POST /api/instructor/isvalid
//@access PUBLIC
export const currentInstructor = async (req, res) => {
  res.json({ success: true });
};

//@desc   Create Course
//@routes POST /api/instructor/course/create
//@access PRIVATE
export const courseCreate = async (req, res) => {
  const { title, description, image, institute, branch, section, year } =
    req.body;

  const slug = slugify(title);
  const batch = await batchSchema
    .findOne({
      institute: institute,
      section: section,
      year: year,
      branch: branch,
    })
    .exec();

  const course = await new courseSchema({
    instructor: req.user.id,
    batch,
    title,
    slug,
    image,
    description,
  }).save();

  const id = batch._id;
  const students = await userSchema.find({ batch: id }).exec();

  for (let i = 0; i < students.length; i++) {
    const student = await userSchema.findByIdAndUpdate(
      { _id: students[i]._id },
      { courseId: course._id },
      { new: true },
    );

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [students[i].email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <html>
              <h2>Hey ${students[i].name}</h2> 
              <p>Hope this email finds you well.</p>
              <p>You are enrolled in course - ${title} </p>
              <p>Login to see the course</p>
              <i>ClassRoom</i>
              </html>
              `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `Enrolled in Course - ${title}`,
        },
      },
    };
    const emailSent = mailTemplate(params);
    emailSent
      .then((data) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  }

  res.json(course);
};
