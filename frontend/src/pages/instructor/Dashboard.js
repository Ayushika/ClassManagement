import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_CREATE_RESET } from "../../constants/courseConstants";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courseGetAll);
  const { success } = useSelector((state) => state.courseCreate);

  const value = "instructor";
  useEffect(() => {
    if (success) {
      dispatch({ type: COURSE_CREATE_RESET });
    }
    dispatch(getCourses(value));
  }, [dispatch, success]);

  return (
    <div>
      <h3 className="text-center text-success">Courses</h3>
      <div className="row">
        {courses &&
          courses.length > 0 &&
          courses.map((course) => {
            return (
              <div className="col-md-3" key={course._id}>
                <Link
                  to={`/instructor/course/${course.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card mb-3 mt-3 text-dark">
                    <img
                      src={course.image.Location}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt="course"
                    />
                    <div className="card-body">
                      <p>{course.title}</p>
                      <p className="text-muted">
                        <i className="fas fa-video p-1"></i> Lessons :{" "}
                        {course.lessons.length}
                      </p>
                      <p className="text-muted">
                        <i className="fas fa-file-pdf p-1"></i> Announcements:{" "}
                        {course.anouncements.length}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
