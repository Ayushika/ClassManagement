/** @format */

import instituteSchema from "../models/InstituteModel";
import branchSchema from "../models/BranchModel";
import batchSchema from "../models/BatchModel";
import userSchema from "../models/UserModel";
import courseSchema from "../models/CourseModel";
import slugify from "slugify";

//@desc  Create Institute
//@routes POST /api/admin/institute
//@access PRIVATE/ADMIN
export const createInstitute = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name);
    const abbreviation = name.split(" ");
    let ans = "";
    for (let i = 0; i < abbreviation.length; i++) {
      ans += abbreviation[i].substring(0, 1);
    }
    const institute = await new instituteSchema({
      name,
      slug,
      abbreviation: ans.toUpperCase(),
    }).save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};

//@desc   Get All Institutes
//@routes POST /api/admin/institute/all
//@access PRIVATE/ADMIN
export const getAllInstitute = async (req, res) => {
  try {
    const institutes = await instituteSchema.find({}).exec();
    res.json(institutes);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Getting Institutes");
  }
};

//@desc   Delete Institute
//@routes DELETE /api/admin/:slug
//@access PRIVATE/ADMIN
export const deleteInstitute = async (req, res) => {
  try {
    const { slug } = req.params;
    //const institute = await instituteSchema.findOneAndDelete({ slug }).exec();
    const institute = await instituteSchema.findOne({ slug }).exec();
    const id = institute._id;

    const branches = await branchSchema.find({ institute: id }).exec();
    // for (let i = 0; i < branches.length; i++) {
    //   const branch = await branchSchema
    //     .findByIdAndDelete({ _id: branches[i]._id })
    //     .exec();
    // }

    const batches = await batchSchema.find({ institute: id }).exec();
    // for (let i = 0; i < batches.length; i++) {
    //   const batch = await batchSchema
    //     .findByIdAndDelete({ _id: batches[i]._id })
    //     .exec();
    // }

    let students = [];
    let courses = [];

    for (let i = 0; i < batches.length; i++) {
      const student = await userSchema.find({ batch: batches[i]._id }).exec();
      const course = await courseSchema.find({ batch: batches[i]._id }).exec();
      if (student) {
        for (let j = 0; j < student.length; j++) {
          students.push(student[i]._id);
        }
      }
      if (course) {
        for (let j = 0; j < course.length; j++) {
          courses.push(course[i]._id);
        }
      }
    }

    // for (let i = 0; i < students.length; i++) {
    //   const student = await userSchema
    //     .findByIdAndDelete({ _id: students[i]._id })
    //     .exec();
    // }

    // for (let i = 0; i < courses.length; i++) {
    //   const course = await courseSchema
    //     .findByIdAndDelete({ _id: courses[i]._id })
    //     .exec();
    // }
    console.log("Student------------------", students);
    console.log("Course------------------------", courses);
    console.log("Batch------------------------", batches);
    console.log("Branch------------------------", branches);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Deleting Institute");
  }
};

//@desc   Update Institute
//@routes PUT /api/admin/branch
//@access PRIVATE/ADMIN
export const updateInstitute = async (req, res) => {
  try {
    const { name, id } = req.body;
    const slug = slugify(name);
    const abbreviation = name.split(" ");
    let ans = "";

    for (let i = 0; i < abbreviation.length; i++) {
      ans += abbreviation[i].substring(0, 1);
    }

    const institute = await instituteSchema
      .findOneAndUpdate(
        { _id: id },
        { name, slug, abbreviation: ans.toUpperCase() },
        { new: true }
      )
      .exec();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};
