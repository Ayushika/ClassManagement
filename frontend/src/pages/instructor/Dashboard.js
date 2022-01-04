/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCoursesByInstructor } from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courseGet);

  useEffect(() => {
    dispatch(getCoursesByInstructor());
  }, [dispatch]);

  return (
    <div>
      <h3 className="text-center text-success">Dashboard</h3>
      <p>
        <Link to="/instructor/course/create" className="nav-link">
          Create Course
        </Link>
      </p>
      <div className="row justify-content-evenly mt-4 p-5">
        {courses &&
          courses.length > 0 &&
          courses.map((course) => {
            return (
              <div className="col-md-3">
                <div className="card  mb-3 pointer">
                  <div className="card-header">
                    <img
                      src={course.image.Location}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      alt="course"
                    />
                  </div>
                  <div className="card-body">
                    <h4 className="blockquote  text-center">{course.title}</h4>

                    <Link to={`/instructor/course/${course.slug}`}>
                      <Button type="button" className="btn">
                        View Course
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
