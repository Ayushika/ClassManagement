/** @format */

import instituteSchema from "../models/InstituteModel";
import slugify from "slugify";

export const createInstitute = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name);
    const institute = await new instituteSchema({ name, slug }).save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};

export const getAllInstitute = async (req, res) => {
  try {
    const institutes = await instituteSchema.find({}).exec();
    res.json(institutes);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Getting Institutes");
  }
};

export const deleteInstitute = async (req, res) => {
  try {
    const { slug } = req.params;
    const institute = await instituteSchema.findOneAndDelete({ slug }).exec();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Deleting Institute");
  }
};
