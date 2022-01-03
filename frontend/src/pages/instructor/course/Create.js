/** @format */

import React, { useState } from "react";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../../../components/Meta";
import { courseCreate } from "../../../actions/courseAction";
import { UPLOAD_IMAGE_RESET } from "../../../constants/userConstants";
import { upload } from "../../../actions/userAction";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Create = () => {
  const intialValues = {
    title: "",
    description: "",
    image: "",
    institute: "",
    branch: "",
    section: "",
    year: "",
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState(intialValues);
  const [preview, setPreview] = useState("");

  const uploadImage = useSelector((state) => state.uploadImage);
  const { image } = uploadImage;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    dispatch(upload(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    values.image = image;
    setValues(intialValues);
    if (
      !values.title &&
      !values.image &&
      !values.description &&
      !values.institute &&
      !values.branch &&
      !values.section &&
      !values.year
    ) {
      toast.warning("All Fields are required");
      return;
    }
    dispatch(courseCreate(values));
    setPreview("");
    dispatch({ type: UPLOAD_IMAGE_RESET });
    history.push("/instructor/dashboard");
  };

  return (
    <div>
      <Meta title='ClassRoom : Create Course' />
      <CourseCreateForm
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        preview={preview}
      />
    </div>
  );
};

export default Create;
