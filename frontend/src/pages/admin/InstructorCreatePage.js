import React, { useState } from "react";
import InstructorCreateForm from "../../components/forms/InstructorCreateForm";
import Meta from "../../components/Meta";

const InstructorCreatePage = () => {
  const intialValues = {
    email: "",
    phone: "",
    image: "",
    name: "",
  };

  const [values, setValues] = useState(intialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setValues(intialValues);
  };
  return (
    <div>
      <Meta title="ClassRoom : Create Instructor" />
      <h1 className="text-center">Create Instructor</h1>
      <div className="underline" />
      <InstructorCreateForm
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
      />
    </div>
  );
};

export default InstructorCreatePage;
