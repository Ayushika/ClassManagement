/** @format */

import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 4,
      maxLength: 40,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      minLength: 4,
      maxLength: 320,
      required: true,
    },
    video: {},
  },
  { timestamps: true }
);

const AnnouncementSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      minLength: 4,
      maxLength: 320,
      required: true,
    },
    file: {},
  },
  { timestamps: true }
);

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: 6,
      maxLength: 50,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      minLength: 20,
      maxLength: 250,
      required: true,
    },
    image: {},
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    lessons: [LessonSchema],
    // anouncements: [AnnouncementSchema],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
