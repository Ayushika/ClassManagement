/** @format */
import courseSchema from "../models/CourseModel";
import batchSchema from "../models/BatchModel";
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

  res.json(course);
};
