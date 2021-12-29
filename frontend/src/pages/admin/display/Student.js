/** @format */

import React, { useEffect, useState } from "react";
import { displayStudent } from "../../../actions/adminAction";
import { useSelector, useDispatch } from "react-redux";
import { getAllBatch } from "../../../actions/batchAction";
import { getAllBranch } from "../../../actions/branchAction";
import { getAllInstitute } from "../../../actions/instituteAction";
import { Row, Col, Form, Container } from "react-bootstrap";

const Student = () => {
  const [institute, setInstitute] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");

  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.studentDisplay);
  const { branches } = useSelector((state) => state.getAllBranch);
  const { institutes } = useSelector((state) => state.getAllInstitute);
  const { batches } = useSelector((state) => state.getAllBatch);

  useEffect(() => {
    dispatch(displayStudent());
    dispatch(getAllInstitute());
    dispatch(getAllBranch());
    dispatch(getAllBatch());
  }, []);

  return (
    <Container className='mt-3'>
      <Row className='mb-3 mt-4'>
        <Form.Group as={Col} controlId='formGridInstitute'>
          <Form.Label>Institute</Form.Label>
          <Form.Select
            className='text-muted'
            value={institute}
            onChange={(e) => {
              setInstitute(e.target.value);
              setBranch("");
              setSection("");
              setYear("");
            }}>
            <option value=''>Select</option>
            {institutes &&
              institutes.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        {institute.length > 0 && (
          <Form.Group as={Col} controlId='formGridBranch'>
            <Form.Label>Branch</Form.Label>
            <Form.Select
              className='text-muted'
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                setSection("");
                setYear("");
              }}>
              <option value=''>Select</option>
              {branches &&
                branches
                  .filter((b) => b.institute._id === institute)
                  .map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
            </Form.Select>
          </Form.Group>
        )}

        {institute.length > 0 && branch.length > 0 && (
          <Form.Group as={Col} controlId='formGridSection'>
            <Form.Label>Year</Form.Label>
            <Form.Select
              className='text-muted'
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setSection("");
              }}>
              <option value=''>Select</option>
              {batches &&
                batches.length > 0 &&
                batches
                  .filter(
                    (b) =>
                      b.institute._id === institute && b.branch._id === branch,
                  )
                  .map((b) => (
                    <option key={b._id} value={b.year}>
                      {b.year}
                    </option>
                  ))}
            </Form.Select>
          </Form.Group>
        )}

        {institute.length > 0 && branch.length > 0 && year.length > 0 && (
          <Form.Group as={Col} controlId='formGridSection'>
            <Form.Label>Section</Form.Label>
            <Form.Select
              className='text-muted'
              value={section}
              onChange={(e) => setSection(e.target.value)}>
              <option value=''>Select</option>
              {batches &&
                batches.length > 0 &&
                batches
                  .filter(
                    (b) =>
                      b.institute._id === institute &&
                      b.branch._id === branch &&
                      b.year === year,
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
      {students && students.length > 0 ? (
        <Row className='mb-4 mt-5'>
          <table className='table table-bordered table-responsive'>
            <thead>
              <tr>
                <th scope='col' className='text-center'>
                  S. no
                </th>
                <th scope='col' className='text-center'>
                  Name
                </th>
                <th scope='col' className='text-center'>
                  Phone
                </th>
                <th scope='col' className='text-center'>
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {institute.length > 0 &&
                branch.length > 0 &&
                year.length > 0 &&
                section.length > 0 &&
                students
                  .filter(
                    (s) =>
                      s.batch.institute === institute &&
                      s.batch.branch === branch &&
                      s.batch.year === year &&
                      s.batch.section === section,
                  )
                  .map((s, index) => {
                    return (
                      <tr key={s._id}>
                        <th scope='row' className='text-center'>
                          {index + 1}
                        </th>
                        <td className='text-center'>{s.name}</td>
                        <td className='text-center'>{s.phone}</td>
                        <td className='text-center'>{s.email}</td>
                      </tr>
                    );
                  })}

              {institute.length > 0 &&
                branch.length > 0 &&
                year.length > 0 &&
                !section &&
                students
                  .filter(
                    (s) =>
                      s.batch.institute === institute &&
                      s.batch.branch === branch &&
                      s.batch.year === year,
                  )
                  .map((s, index) => {
                    return (
                      <tr key={s._id}>
                        <th scope='row' className='text-center'>
                          {index + 1}
                        </th>
                        <td className='text-center'>{s.name}</td>
                        <td className='text-center'>{s.phone}</td>
                        <td className='text-center'>{s.email}</td>
                      </tr>
                    );
                  })}

              {institute.length > 0 &&
                branch.length > 0 &&
                !year &&
                !section &&
                students
                  .filter(
                    (s) =>
                      s.batch.institute === institute &&
                      s.batch.branch === branch,
                  )
                  .map((s, index) => {
                    return (
                      <tr key={s._id}>
                        <th scope='row' className='text-center'>
                          {index + 1}
                        </th>
                        <td className='text-center'>{s.name}</td>
                        <td className='text-center'>{s.phone}</td>
                        <td className='text-center'>{s.email}</td>
                      </tr>
                    );
                  })}

              {institute.length > 0 &&
                !branch &&
                !year &&
                !section &&
                students
                  .filter((s) => s.batch.institute === institute)
                  .map((s, index) => {
                    return (
                      <tr key={s._id}>
                        <th scope='row' className='text-center'>
                          {index + 1}
                        </th>
                        <td className='text-center'>{s.name}</td>
                        <td className='text-center'>{s.phone}</td>
                        <td className='text-center'>{s.email}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </Row>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Student;
