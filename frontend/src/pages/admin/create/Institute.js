/** @format */

import React, { useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createInstitute,
  deleteInstitute,
  getAllInstitute,
} from "../../../actions/instituteAction";

const Institute = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { institutes } = useSelector((state) => state.getAllInstitute);
  const { institute } = useSelector((state) => state.createInstitute);
  const { deleteSuccess } = useSelector((state) => state.deleteInstitute);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createInstitute(name));
    setName("");
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteInstitute(slug));
    }
  };

  useEffect(() => {
    dispatch(getAllInstitute());
  }, [institute, deleteSuccess, dispatch]);

  return (
    <>
      <h2 className="text-center">Institute</h2>
      <div className="underline"></div>
      <div className="container">
        <div className="row">
          <Form className="mt-3 mb-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="row justify-content-center">
                <div className="col-md-11">
                  <Form.Control
                    type="text"
                    placeholder="Enter Institute Name"
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
        {institutes &&
          institutes.map((i) => {
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

export default Institute;
