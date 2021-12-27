/** @format */

import React, { useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstitute } from "../../../actions/instituteAction";
import {
  createBranch,
  deleteBranch,
  getAllBranch,
} from "../../../actions/branchAction";

const Branch = () => {
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");

  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.getAllBranch);
  const { branch } = useSelector((state) => state.createBranch);
  const { deleteSuccess } = useSelector((state) => state.deleteBranch);

  const { institutes } = useSelector((state) => state.getAllInstitute);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBranch(name, institute));
    setName("");
    setInstitute(0);
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteBranch(slug));
    }
  };

  useEffect(() => {
    dispatch(getAllInstitute());
    dispatch(getAllBranch());
  }, [institute, deleteSuccess, branch, dispatch]);

  return (
    <>
      <h2 className="text-center">Branch</h2>
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
                    <option value="0">Select Institute</option>
                    {institutes &&
                      institutes.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.name}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control
                    type="text"
                    placeholder="Enter Branch Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-1">
                  <button
                    type="submit"
                    className="btn btn-success btn-md"
                    onClick={(e) => handleSubmit(e)}
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
        {branches &&
          branches.map((i) => {
            return (
              <Card key={i._id} className="mb-3 text-muted">
                <div className="row p-3">
                  <div className="col-md-11">
                    <span className="text-muted">{i.name}</span>
                  </div>
                  <div className="col-md-1">
                    <span
                      className="btn btn-sm float-right"
                      onClick={() => handleDelete(i.slug)}
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

export default Branch;
