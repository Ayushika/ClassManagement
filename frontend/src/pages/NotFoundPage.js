/** @format */

import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className='container text-center'>
      <h2 className='mt-4'>Oops!</h2>
      <p className='mt-3'>404 | Page Not Found 😥</p>
      <Link to='/' className='btn btn-success btn-md'>
        Back To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
