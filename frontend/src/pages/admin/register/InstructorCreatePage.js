import React, { useState } from "react";
import InstructorCreateForm from "../../../components/forms/InstructorCreateForm";
import Meta from "../../../components/Meta";
import { useSelector, useDispatch } from "react-redux";
import { registerInstructor } from "../../../actions/adminAction";
import { upload } from "../../../actions/userAction";
import { toast } from "react-toastify";
import { UPLOAD_IMAGE_RESET } from "../../../constants/userConstants";
import Loading from "../../../components/Loading";

const InstructorCreatePage = () => {
  const intialValues = {
    email: "",
    phone: "",
    name: "",
  };

  const uploadImage = useSelector((state) => state.uploadImage);
  const { image, loading: uploading } = uploadImage;

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedButtonText, setUploadedButtonText] = useState("Upload Image");

  const dispatch = useDispatch();

  const [values, setValues] = useState(intialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadedButtonText(file.name);
    dispatch(upload(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!values.email || !values.phone || !values.name) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
    dispatch(registerInstructor(values, image));
    setValues(intialValues);
    setPreview("");
    setLoading(false);
    setUploadedButtonText("Upload Image");
    dispatch({ type: UPLOAD_IMAGE_RESET });
  };
  return (
    <div>
      <Meta title="ClassRoom : Create Instructor" />
      {loading && <Loading />}

      <InstructorCreateForm
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        preview={preview}
        uploading={uploading}
        uploadedButtonText={uploadedButtonText}
      />
    </div>
  );
};

export default InstructorCreatePage;
