/** @format */

import React, { useState } from "react";
import RegisterModal from "../../components/modals/RegisterModal";
import CreateModal from "../../components/modals/CreateModal";
import DisplayModal from "../../components/modals/DisplayModal";
import register from "../../images/register.svg";
import create from "../../images/create.svg";
import users from "../../images/users.svg";

const Dashboard = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDisplayModal, setShowDisplayModal] = useState(false);

  return (
    <>
      <h2 className="text-center">Dashboard</h2>
      <div className="underline"></div>

      <div className="row justify-content-evenly mt-4 p-5">
        <div className="col-md-3">
          <div
            className="card border-success mb-3 pointer"
            onClick={() => setShowRegisterModal(true)}
          >
            <div className="card-header">
              <img
                src={register}
                alt="Create"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div className="card-body">
              <h4 className="blockquote  text-center">Register</h4>
              <p className="card-text text-muted text-center">
                Student | Instructor
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card border-success mb-3 pointer"
            onClick={() => setShowCreateModal(true)}
          >
            <div className="card-header">
              <img
                src={create}
                alt="Create"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div className="card-body">
              <h4 className="blockquote  text-center">Create</h4>
              <p className="card-text text-muted text-center">
                Institute | Batch
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card border-success mb-3 pointer"
            onClick={() => setShowDisplayModal(true)}
          >
            <div className="card-header">
              <img
                src={users}
                alt="User"
                style={{ width: "100%", height: "200px" }}
              />
            </div>
            <div className="card-body">
              <h4 className="blockquote  text-center">Display</h4>
              <p className="card-text text-muted text-center">
                Student | Instructor
              </p>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />
      <CreateModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      />
      <DisplayModal
        show={showDisplayModal}
        onHide={() => setShowDisplayModal(false)}
      />
    </>
  );
};

export default Dashboard;
