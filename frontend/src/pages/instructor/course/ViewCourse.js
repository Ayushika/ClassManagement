import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import Meta from "../../../components/Meta";
import axios from "axios";
import { toast } from "react-toastify";
import { addLesson } from "../../../actions/courseAction";

const ViewCourse = ({ match }) => {
  const { slug } = match.params;
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const intialValues = {
    title: "",
    description: "",
    video: "",
  };
  const dispatch = useDispatch();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [values, setValues] = useState(intialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.video) {
      toast.error("Please Upload Video");
      return;
    }
    dispatch(addLesson(slug, values));
    toast.error("Lesson Uploaded Successfully");
  };
  const handleVideoUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const videoData = new FormData();
      videoData.append("video", file);
      const { data } = await axios.post(
        `http://localhost:5000/api/instructor/course/upload-video`,
        videoData,
        config,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      console.log(data);
      setValues({ ...values, video: data });
    } catch (error) {
      console.log(error);
      toast.error("Video Uploading Failed");
    }
  };

  return (
    <>
      <Meta title={`ClassRoom : ${slug}`} />
      <h3>Course: {slug}</h3>

      <Button
        type="button"
        className="btn"
        onClick={() => setShowLessonModal(true)}
      >
        Add Lesson +
      </Button>

      <Modal
        show={showLessonModal}
        onHide={() => setShowLessonModal(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <i className="fas fa-photo-video"></i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-row mt-3">
              <div className="col">
                <div className="form-group">
                  <label className="btn btn-outline-success btn-block">
                    Upload Video
                    <input
                      type="file"
                      name="image"
                      onChange={handleVideoUpload}
                      accept="video/*"
                      hidden
                      required
                    />
                  </label>
                </div>
              </div>
            </div>
            <Row>
              <Col xs={12} md={12}>
                <Form.Group controlId="title" className="mt-3">
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={values.title}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail" className="mt-3">
                  <textarea
                    className="form-control"
                    value={values.description}
                    name="description"
                    placeholder="Add Description"
                    onChange={handleChange}
                    required
                  ></textarea>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setShowLessonModal(false)}
              className="btn btn-success"
              type="submit"
              disabled={!values.video}
            >
              Upload
            </Button>
            <Button
              onClick={() => setShowLessonModal(false)}
              className="btn btn-success"
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ViewCourse;
