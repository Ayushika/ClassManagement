/** @format */

import React, { useState } from "react";
import StudentCreateForm from "../../../components/forms/StudentCreateForm";
import { registerStudent } from "../../../actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../../../components/Meta";
import { upload } from "../../../actions/userAction";
import { toast } from "react-toastify";
import { UPLOAD_IMAGE_RESET } from "../../../constants/userConstants";

const StudentCreatePage = () => {
  const intialValues = {
    email: "",
    phone: "",
    image: "",
    name: "",
    institute: "",
    branch: "",
    section: "",
    year: "",
  };

  const dispatch = useDispatch();
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
      !values.email &&
      !values.image &&
      !values.phone &&
      !values.name &&
      !values.institute &&
      !values.branch &&
      !values.section &&
      !values.year
    ) {
      toast.warning("All Fields are required");
      return;
    }
    dispatch(registerStudent(values));
    setPreview("");
    dispatch({ type: UPLOAD_IMAGE_RESET });
  };

  return (
    <div>
      <Meta title="ClassRoom : Create Student" />
      <StudentCreateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleImage={handleImage}
        values={values}
        setValues={setValues}
        preview={preview}
      />
    </div>
  );
};

export default StudentCreatePage;
