import branchSchema from "../models/BranchModel";
import slugify from "slugify";

//@desc   Create Branch
//@routes POST /api/admin/branch
//@access PRIVATE/ADMIN
export const createBranch = async (req, res) => {
  try {
    const { name, institute } = req.body;
    const slug = slugify(name);

    if (!institute) {
      return res.status(400).send("Select Institute");
    }

    const branch = await new branchSchema({ name, slug, institute }).save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Creating");
  }
};

//@desc   Get All Branches
//@routes POST /api/admin/branch/all
//@access PRIVATE/ADMIN
export const getAllBranch = async (req, res) => {
  try {
    const branches = await branchSchema.find({}).populate("institute").exec();
    res.json(branches);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Getting Branches");
  }
};

//@desc   Delete Branch
//@routes POST /api/admin/branch/:slug
//@access PRIVATE/ADMIN
export const deleteBranch = async (req, res) => {
  try {
    const { slug } = req.params;
    const branch = await branchSchema.findOneAndDelete({ slug }).exec();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error While Deleting Branch");
  }
};
