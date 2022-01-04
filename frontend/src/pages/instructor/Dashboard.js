import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courseGet);

  const value = "instructor";
  useEffect(() => {
    dispatch(getCourses(value));
  }, [dispatch]);

  return (
    <div>
      <h3 className="text-center text-success">Courses</h3>
      <div className="row justify-content-evenly mt-4 p-5">
        {courses &&
          courses.length > 0 &&
          courses.map((course) => {
            return (
              <div className="col-md-3" key={course._id}>
                <div className="card mb-3 text-center">
                  <img
                    src={course.image.Location}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "center",
                    }}
                    alt="course"
                  />
                  <div className="card-body">
                    <p
                      className="text-muted"
                      style={{ letterSpacing: "1.5px" }}
                    >
                      {course.title}
                    </p>
                    <Link to={`/instructor/course/${course.slug}`}>
                      <Button type="button" className="btn btn-success mt-1">
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
