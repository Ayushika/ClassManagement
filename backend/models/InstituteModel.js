/** @format */

import mongoose from "mongoose";
const InstituteSchema = new mongoose.Schema(
  {
    name: {
        type : String,
        required: true,
    },
  },
  { timestamps: true },
);

const Institute = mongoose.model("Institute", InstituteSchema);
export default Institute;
