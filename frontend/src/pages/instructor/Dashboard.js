/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <h3 className='text-center text-success'>
      Instructor
      <Link to='/instructor/course/create'>Create Course</Link>
    </h3>
  );
};

export default Dashboard;
