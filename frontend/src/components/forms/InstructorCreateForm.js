import React from "react";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
const InstructorCreateForm = ({
  handleSubmit,
  handleImage,
  values,
  setValues,
  handleChange,
}) => {
  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <div
              className="card p-5"
              style={{ boxShadow: "0px 0 18px rgba(55, 66, 59, 0.08)" }}
            >
              <Form onSubmit={handleSubmit}>
                <h2>Create Instructor</h2>
                <div className="underline2"></div>
                <div className="form-row mt-3">
                  <div className="col">
                    <div className="form-group">
                      <label className="btn btn-outline-success btn-block">
                        Upload Image
                        <input
                          type="file"
                          name="image"
                          onChange={handleImage}
                          accept="image/*"
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <Row className="mb-4 mt-4">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={values.email}
                      name="email"
                      placeholder="name@example.com"
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>
                </Row>

                <Form.Group controlId="phone" className="mt-3">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="XXXX-XX"
                    value={values.phone}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" className=" btn btn-success btn-md mt-4">
                  Save
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InstructorCreateForm;
