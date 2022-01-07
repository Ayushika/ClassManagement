/** @format */

import courseSchema from "../models/CourseModel";
import userSchema from "../models/UserModel";

//@desc   Current Student
//@routes POST /api/student/isvalid
//@access PUBLIC
export const currentStudent = async (req, res) => {
  res.json({ success: true });
};

//@desc   Get All Course
//@routes POST /api/student/course/get/all
//@access PRIVATE
export const courseGetAll = async (req, res) => {
  try {
    const id = req.user.id;
    const students = await userSchema.findOne({ _id: id }).select("-password");

    const courses = [];
    for (let i = 0; i < students.courseId.length; i++) {
      const course = await courseSchema
        .findById(students.courseId[i])
        .populate("instructor")
        .exec();
      courses.push(course);
    }

    res.json(courses);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};

//@desc   Get Course
//@routes POST /api/student/course/get
//@access PRIVATE
export const courseGetDetails = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).send("Error,Please Try Again");
  }
};
