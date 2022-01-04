/** @format */

import courseSchema from "../models/CourseModel";
import userSchema from "../models/UserModel";

//@desc   Current Student
//@routes POST /api/student/isvalid
//@access PUBLIC
export const currentStudent = async (req, res) => {
  res.json({ success: true });
};

//@desc   Get Course
//@routes POST /api/student/course/get
//@access PRIVATE
export const courseGet = async (req, res) => {
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
};
