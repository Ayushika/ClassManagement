/** @format */

import React, { useState, useEffect } from "react";
import StudentCreateForm from "../../components/forms/StudentCreateForm";
import Meta from "../../components/Meta";

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

  const [values, setValues] = useState(intialValues);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setValues(intialValues);
  };

  return (
    <div>
      <Meta title='ClassRoom : Create Student' />
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
