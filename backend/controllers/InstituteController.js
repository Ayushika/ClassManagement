/** @format */

import instituteSchema from "../models/InstituteModel";
import branchSchema from "../models/BranchModel";
import batchSchema from "../models/BatchModel";
import userSchema from "../models/UserModel";
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
    const institute = await instituteSchema.findOneAndDelete({ slug }).exec();

    const id = institute._id;

    const branches = await branchSchema.find({ institute: id }).exec();

    for (let i = 0; i < branches.length; i++) {
      const branch = await branchSchema
        .findOneAndDelete({ _id: branches[i]._id })
        .exec();
    }

    const batches = await batchSchema.find({ institute: id }).exec();

    for (let i = 0; i < batches.length; i++) {
      const batch = await batchSchema
        .findOneAndDelete({ _id: batches[i]._id })
        .exec();
    }

    let students = [];

    for (let i = 0; i < batches.length; i++) {
      const student = await userSchema.find({ batch: batches[i]._id }).exec();
      student.push(student);
    }

    for (let i = 0; i < students.length; i++) {
      const student = await userSchema
        .findOneAndDelete({ _id: students[i]._id })
        .exec();
    }

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
        { new: true },
      )
      .exec();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};
