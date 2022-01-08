/** @format */

import React, { useEffect } from "react";
import { getCourses } from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CourseCard from "../../components/cards/StudentCourseCard";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courseGetAll);

  const value = "student";
  useEffect(() => {
    dispatch(getCourses(value));
  }, [dispatch]);

  return (
    <div>
      <h3 className="text-center text-success">Courses</h3>

      <Row>
        {courses &&
          courses.length > 0 &&
          courses.map((course) => {
            return (
              <Col key={course._id} sm={12} md={6} lg={4} xl={3}>
                <CourseCard course={course} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Dashboard;
