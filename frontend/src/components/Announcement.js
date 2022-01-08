/** @format */

import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Announcement = ({
  role,
  course,
  setShowAnnouncementModal,
  announcementValues,
  handleFileUpload,
  handleAnnouncementSubmit,
  setAnnouncementValues,
  showAnnouncementModal,
}) => {
  return (
    <div>
      {course && course.anouncements && course.anouncements.length <= 0 && (
        <p className='text-muted' style={{ letterSpacing: ".75px" }}>
          No Announcements yet
        </p>
      )}
      {course.anouncements &&
        course.anouncements.length > 0 &&
        course.anouncements.map((c, i) => (
          <div key={c._id} className='mt-2'>
            <Card>
              <Card.Body>{c.description}</Card.Body>
              {c.file && (
                <iframe src={c.file.Location} style={{ height: "50%" }} />
              )}
            </Card>
          </div>
        ))}
      {role !== "student" && (
        <>
          <Button
            type='button'
            className='btn btn-success mt-4'
            onClick={() => setShowAnnouncementModal(true)}>
            Add Announcement +
          </Button>
          <Modal
            show={showAnnouncementModal}
            onHide={() => setShowAnnouncementModal(false)}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
            <Form onSubmit={handleAnnouncementSubmit}>
              <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                  <i className='fas fa-file-pdf'></i>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='form-row mt-3'>
                  <div className='col'>
                    <div className='form-group'>
                      <label className='btn btn-outline-success btn-block'>
                        Upload File
                        <input
                          type='file'
                          name='file'
                          onChange={handleFileUpload}
                          accept='.pdf'
                          hidden
                        />
                      </label>
                      {/* {progress > 0 && (
                    <ProgressBar
                      striped
                      variant='success'
                      now={progress}
                      label={`${progress}%`}
                    />
                  )} */}
                    </div>
                  </div>
                </div>
                <Row>
                  <Col xs={12} md={12}>
                    <Form.Group
                      as={Col}
                      controlId='formGridEmail'
                      className='mt-3'>
                      <textarea
                        className='form-control'
                        value={announcementValues.description}
                        name='description'
                        placeholder='Add Description'
                        onChange={(e) =>
                          setAnnouncementValues({
                            ...announcementValues,
                            description: e.target.value,
                          })
                        }
                        required></textarea>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => setShowAnnouncementModal(false)}
                  className='btn btn-success'
                  type='submit'>
                  Upload
                </Button>
                <Button
                  onClick={() => setShowAnnouncementModal(false)}
                  className='btn btn-success'>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Announcement;
