import React, { useState } from "react";
import InstructorCreateForm from "../../../components/forms/InstructorCreateForm";
import Meta from "../../../components/Meta";
import { useSelector, useDispatch } from "react-redux";
import { upload, registerInstructor } from "../../../actions/adminAction";
import { toast } from "react-toastify";
import { UPLOAD_IMAGE_RESET } from "../../../constants/adminConstants";

const InstructorCreatePage = () => {
  const intialValues = {
    email: "",
    phone: "",
    name: "",
  };

  const uploadImage = useSelector((state) => state.uploadImage);
  const { image } = uploadImage;

  const [preview, setPreview] = useState("");

  const dispatch = useDispatch();

  const [values, setValues] = useState(intialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    dispatch(upload("instructor", file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.phone || !values.name) {
      toast.error("All fields are required");
      return;
    }
    dispatch(registerInstructor(values, image));
    setValues(intialValues);
    setPreview("");
    dispatch({ type: UPLOAD_IMAGE_RESET });
  };
  return (
    <div>
      <Meta title="ClassRoom : Create Instructor" />
      <InstructorCreateForm
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

export default InstructorCreatePage;
