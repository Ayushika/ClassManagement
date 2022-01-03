/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h3 className='text-center text-success'>Instructor</h3>
      <p>
        <Link to='/instructor/course/create' className='nav-link'>
          Create Course
        </Link>
      </p>
    </div>
  );
};

export default Dashboard;
