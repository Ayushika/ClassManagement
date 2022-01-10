/** @format */

import batchSchema from "../models/BatchModel";
import userSchema from "../models/UserModel";

//@desc   Create Batch
//@routes POST /api/admin/batch
//@access PRIVATE/ADMIN
export const createBatch = async (req, res) => {
  try {
    const { institute, branch, section, year } = req.body;

    if (!institute || !branch || !section || !year) {
      return res.status(400).send("Select All Fields");
    }
    const batch = await new batchSchema({
      institute,
      branch,
      section,
      year,
    }).save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};

//@desc   Get All Batches
//@routes POST /api/admin/batch/all
//@access PRIVATE/ADMIN
export const getAllBatch = async (req, res) => {
  try {
    const batches = await batchSchema
      .find({})
      .populate("institute")
      .populate("branch")
      .exec();
    res.json(batches);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Getting Batches");
  }
};

//@desc   Delete Batch
//@routes POST /api/admin/batch/:id
//@access PRIVATE/ADMIN
export const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;

    const batch = await batchSchema.findByIdAndDelete(id).exec();

    const users = await userSchema.find({ batch: batch._id }).exec();

    for (let i = 0; i < users.length; i++) {
      const user = await userSchema
        .findOneAndDelete({ batch: batch._id })
        .exec();
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Deleting Batch");
  }
};

//@desc  Update Batch
//@routes PUT /api/admin/batch
//@access PRIVATE/ADMIN
export const updateBatch = async (req, res) => {
  try {
    const { id, institute, branch, section, year } = req.body;

    if (!institute || !branch || !section || !year) {
      return res.status(400).send("Select All Fields");
    }

    const batch = await batchSchema
      .findOneAndUpdate(
        { _id: id },
        { institute, branch, section, year },
        { new: true }
      )
      .exec();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};
