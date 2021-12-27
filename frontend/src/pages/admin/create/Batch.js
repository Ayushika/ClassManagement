import React, { useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstitute } from "../../../actions/instituteAction";
import { getAllBranch } from "../../../actions/branchAction";
import {
  createBatch,
  deleteBatch,
  getAllBatch,
} from "../../../actions/batchAction";

const Batch = () => {
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");

  const [institute, setInstitute] = useState("");
  const [branch, setBranch] = useState("");

  const { branches } = useSelector((state) => state.getAllBranch);
  const { batch } = useSelector((state) => state.createBatch);
  const { institutes } = useSelector((state) => state.getAllInstitute);
  const { batches } = useSelector((state) => state.getAllBatch);
  const { deleteSuccess } = useSelector((state) => state.deleteBatch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInstitute());
    dispatch(getAllBranch());
    dispatch(getAllBatch());
  }, [dispatch, deleteSuccess, batch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBatch(institute, branch, year, section));
    setInstitute("");
    setBranch("");
    setYear("");
    setSection("");
  };

  let years = [];
  for (
    let i = new Date().getFullYear() - 4;
    i <= new Date().getFullYear();
    i++
  ) {
    years.push(i);
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteBatch(id));
    }
  };

  return (
    <>
      <h2 className="text-center">Batch</h2>
      <div className="underline"></div>
      <div className="container">
        <div className="row">
          <Form className="mt-3 mb-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row justify-content-center">
                <div className="col-md-11">
                  <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                  >
                    <option value="">Select Institute</option>
                    {institutes &&
                      institutes.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                  </Form.Select>

                  {institute !== "" && (
                    <Form.Select
                      className="mb-3"
                      aria-label="Default select example"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    >
                      <option value="">Select Branch</option>
                      {branches &&
                        branches
                          .filter((b) => b.institute._id === institute)
                          .map((i) => (
                            <option key={i._id} value={i._id}>
                              {i.name}
                            </option>
                          ))}
                    </Form.Select>
                  )}

                  {institute !== "" && branch !== "" && (
                    <Form.Select
                      className="mb-3"
                      aria-label="Default select example"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {years.map((i, indx) => (
                        <option key={indx} value={i}>
                          {i}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  {institute !== "" && branch !== "" && year !== "" && (
                    <Form.Control
                      type="text"
                      placeholder="Enter Section Name"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                    />
                  )}
                </div>
                <div className="col-md-1">
                  <button
                    type="submit"
                    className="btn btn-success btn-md"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="row container">
        {batches &&
          batches.map((i) => {
            return (
              <Card key={i._id} className="mb-3 text-muted">
                <div className="row p-3">
                  <div className="col-md-11">
                    <span className="text-muted">
                      {i.year} - {i.section} - {i.branch.name}
                    </span>
                  </div>
                  <div className="col-md-1">
                    <span
                      className="btn btn-sm float-right"
                      onClick={() => handleDelete(i._id)}
                    >
                      <i
                        className="fas fa-trash text-danger"
                        style={{ fontSize: "18px" }}
                      ></i>
                    </span>
                    <span className="btn btn-sm float-right">
                      <i
                        className="fas fa-edit text-warning"
                        style={{ fontSize: "18px" }}
                      ></i>
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default Batch;
