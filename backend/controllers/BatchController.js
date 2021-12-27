import batchSchema from "../models/BatchModel";

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
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Deleting Batch");
  }
};
