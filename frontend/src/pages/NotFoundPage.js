import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1 className="font-weight-bold  display-1">Oops!</h1>
      <p className="display-3 mb-8">404 | Page Not Found 😥</p>
      <Link to="/" className="btn btn-success btn-lg mt-3">
        Back To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
