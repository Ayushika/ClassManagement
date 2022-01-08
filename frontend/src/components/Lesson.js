import React from "react";
import ReactPlayer from "react-player";
import {
  Accordion,
  Button,
  Col,
  Form,
  Modal,
  Row,
  ProgressBar,
} from "react-bootstrap";

const Lesson = ({
  course,
  setShowLessonModal,
  handleVideoUpload,
  showLessonModal,
  handleSubmit,
  progress,
  values,
  handleChange,
}) => {
  return (
    <div>
      {course.lessons &&
        course.lessons.length > 0 &&
        course.lessons.map((c, i) => (
          <div key={c._id}>
            <Accordion>
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{c.title}</Accordion.Header>
                <Accordion.Body>
                  <ReactPlayer
                    url={c.video.Location}
                    className="react-player-div"
                    width="100%"
                    height="100%"
                    controls
                  />
                  <p>{c.description}</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      <Button
        type="button"
        className="btn btn-success mt-4"
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
                      name="video"
                      onChange={handleVideoUpload}
                      accept="video/*"
                      hidden
                      required
                    />
                  </label>
                  {progress > 0 && (
                    <ProgressBar
                      striped
                      variant="success"
                      now={progress}
                      label={`${progress}%`}
                    />
                  )}
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
    </div>
  );
};

export default Lesson;
