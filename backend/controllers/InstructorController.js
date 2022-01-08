/** @format */
import courseSchema from "../models/CourseModel";
import batchSchema from "../models/BatchModel";
import userSchema from "../models/UserModel";
import { mailTemplate } from "../utils/awsServices";
import slugify from "slugify";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import fs from "fs";

dotenv.config();
const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

//@desc   Current Instructor
//@routes POST /api/instructor/isvalid
//@access PUBLIC
export const currentInstructor = async (req, res) => {
  res.json({ success: true });
};

//@desc   Get All Courses
//@routes POST /api/instructor/course/get/all
//@access PRIVATE
export const courseGetAll = async (req, res) => {
  try {
    const courses = await courseSchema
      .find({ instructor: req.user.id })
      .populate("instructor")
      .populate("batch");
    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Get Course Details
//@routes POST /api/instructor/course/get
//@access PRIVATE
export const courseGetDetails = async (req, res) => {
  try {
    const { slug } = req.body;
    const course = await courseSchema
      .findOne({ instructor: req.user.id, slug })
      .populate("instructor")
      .populate("batch");
    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Create Course
//@routes POST /api/instructor/course/create
//@access PRIVATE
export const courseCreate = async (req, res) => {
  try {
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

    const instructor = await userSchema.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { courseId: course._id } },
      { new: true }
    );

    const id = batch._id;
    const students = await userSchema.find({ batch: id }).exec();

    for (let i = 0; i < students.length; i++) {
      const student = await userSchema.findByIdAndUpdate(
        { _id: students[i]._id },

        { $push: { courseId: course._id } },
        { new: true }
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
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("Error,Please Try Again");
        });
    }

    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Upload Video
//@routes POST /api/course/upload-video
//@access PRIVATE
export const uploadVideo = async (req, res) => {
  try {
    const { video } = req.files;
    if (!video) {
      res.status(400).send("No Video");
    }
    const params = {
      Bucket: "class-room",
      Key: `${nanoid()}.${video.type.split("/")[1]}`, //video/mp4
      Body: fs.readFileSync(video.path),
      ACL: "public-read",
      ContentType: video.type.split("/")[1],
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

//@desc   Add Lesson
//@routes POST /api/course/add-lesson
//@access PRIVATE
export const addLesson = async (req, res) => {
  try {
    const { title, description, slug, video } = req.body;
    const course = await courseSchema.findOne({ slug });
    if (!course) {
      res.status(400).send("No Course Found");
    }
    console.log(video);
    const lesson = {
      title: title,
      description: description,
      video: video,
    };

    course.lessons.push(lesson);
    await course.save();

    res.json(course);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};
