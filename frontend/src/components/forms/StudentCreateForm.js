/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranch } from "../../actions/branchAction";
import { getAllInstitute } from "../../actions/instituteAction";
import { getAllBatch } from "../../actions/batchAction";
import { Row, Col, Button, Form, Container, Badge } from "react-bootstrap";

const StudentCreateForm = ({
  handleSubmit,
  handleImage,
  values,
  setValues,
  preview,
  handleChange,
}) => {
  const dispatch = useDispatch();

  const { branches } = useSelector((state) => state.getAllBranch);
  const { institutes } = useSelector((state) => state.getAllInstitute);
  const { batches } = useSelector((state) => state.getAllBatch);

  useEffect(() => {
    dispatch(getAllInstitute());
    dispatch(getAllBranch());
    dispatch(getAllBatch());
  }, [dispatch]);

  return (
    <Container className='mt-3'>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <div
            className='card p-5'
            style={{ boxShadow: "0px 0 18px rgba(55, 66, 59, 0.08)" }}>
            <Form onSubmit={handleSubmit}>
              <h2>Create Student</h2>
              <div className='underline2'></div>
              <div className='form-row mt-3'>
                <div className='col'>
                  <div className='form-group'>
                    <label className='btn btn-outline-success btn-block'>
                      Upload Image
                      <input
                        type='file'
                        name='image'
                        onChange={handleImage}
                        accept='image/*'
                        hidden
                        required
                      />
                    </label>
                    {preview !== "" && (
                      <Badge pill className='pointer' as='img-badge'>
                        <img
                          src={preview}
                          alt='preview'
                          className='m-2'
                          style={{
                            width: "80px",
                            objectFit: "cover",
                          }}
                        />
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Row className='mb-4 mt-4'>
                <Form.Group as={Col} controlId='formGridName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    placeholder='John Doe'
                    required></Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    value={values.email}
                    name='email'
                    placeholder='name@example.com'
                    onChange={handleChange}
                    required></Form.Control>
                </Form.Group>
              </Row>

              <Form.Group controlId='phone' className='mt-3'>
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type='text'
                  name='phone'
                  placeholder='XXXX-XX'
                  value={values.phone}
                  required
                  onChange={handleChange}></Form.Control>
              </Form.Group>

              <Row className='mb-3 mt-4'>
                <Form.Group as={Col} controlId='formGridInstitute'>
                  <Form.Label>Institute</Form.Label>
                  <Form.Select
                    defaultValue='Select'
                    className='text-muted'
                    value={values.institute}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        institute: e.target.value,
                        section: "",
                        year: "",
                        branch: "",
                      })
                    }>
                    <option value=''>Select</option>
                    {institutes &&
                      institutes.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                {values.institute.length > 0 && (
                  <Form.Group as={Col} controlId='formGridBranch'>
                    <Form.Label>Branch</Form.Label>
                    <Form.Select
                      defaultValue='Select'
                      className='text-muted'
                      value={values.branch}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          branch: e.target.value,
                          section: "",
                          year: "",
                        })
                      }>
                      <option value=''>Select</option>
                      {branches &&
                        branches
                          .filter((b) => b.institute._id === values.institute)
                          .map((b) => (
                            <option key={b._id} value={b._id}>
                              {b.name}
                            </option>
                          ))}
                    </Form.Select>
                  </Form.Group>
                )}
              </Row>
              <Row className='mb-3 mt-4'>
                {values.institute.length > 0 && values.branch.length > 0 && (
                  <Form.Group as={Col} controlId='formGridSection'>
                    <Form.Label>Year</Form.Label>
                    <Form.Select
                      defaultValue='Select'
                      className='text-muted'
                      value={values.year}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          year: e.target.value,
                          section: "",
                        })
                      }>
                      <option value=''>Select</option>
                      {batches &&
                        batches.length > 0 &&
                        batches
                          .filter(
                            (b) =>
                              b.institute._id === values.institute &&
                              b.branch._id === values.branch,
                          )
                          .map((b) => (
                            <option key={b._id} value={b.year}>
                              {b.year}
                            </option>
                          ))}
                    </Form.Select>
                  </Form.Group>
                )}

                {values.institute.length > 0 &&
                  values.branch.length > 0 &&
                  values.year.length > 0 && (
                    <Form.Group as={Col} controlId='formGridSection'>
                      <Form.Label>Section</Form.Label>
                      <Form.Select
                        defaultValue='Select'
                        className='text-muted'
                        value={values.section}
                        onChange={(e) =>
                          setValues({ ...values, section: e.target.value })
                        }>
                        <option value=''>Select</option>
                        {batches &&
                          batches.length > 0 &&
                          batches
                            .filter(
                              (b) =>
                                b.institute._id === values.institute &&
                                b.branch._id === values.branch &&
                                b.year === values.year,
                            )
                            .map((b) => (
                              <option key={b._id} value={b.section}>
                                {b.section}
                              </option>
                            ))}
                      </Form.Select>
                    </Form.Group>
                  )}
              </Row>

              <Button type='submit' className=' btn btn-success btn-md mt-2'>
                Save
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentCreateForm;
