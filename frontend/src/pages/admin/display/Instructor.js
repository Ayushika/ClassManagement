/** @format */

import React, { useEffect } from "react";
import { displayInstructor } from "../../../actions/adminAction";
import { useSelector, useDispatch } from "react-redux";
import { Row, Container } from "react-bootstrap";

const Instructor = () => {
  const dispatch = useDispatch();
  const { instructors } = useSelector((state) => state.instructorDisplay);

  useEffect(() => {
    dispatch(displayInstructor());
  }, []);
  return (
    <Container className='mt-3'>
      <Row className='mb-3 mt-5'>
        <table className='table table-bordered table-responsive'>
          <thead>
            <tr>
              <th scope='col'>S. no</th>
              <th scope='col'>Name</th>
              <th scope='col'>Phone</th>
              <th scope='col'>Email</th>
            </tr>
          </thead>
          <tbody>
            {instructors &&
              instructors.length > 0 &&
              instructors.map((s, index) => {
                return (
                  <tr key={s._id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{s.name}</td>
                    <td>{s.phone}</td>
                    <td>{s.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Row>
    </Container>
  );
};

export default Instructor;
