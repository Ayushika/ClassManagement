/** @format */

import React, { useEffect, useState } from "react";
import { getCourses } from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CourseCard from "../../components/cards/StudentCourseCard";
import Paginate from "../../components/Paginate";
import Meta from "../../components/Meta";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [paginatePage, setPaginatePage] = useState(1);
  const { courses, page, pages } = useSelector((state) => state.courseGetAll);

  const value = "student";
  useEffect(() => {
    dispatch(getCourses(value, paginatePage));
  }, [dispatch, paginatePage]);

  return (
    <>
      <Meta title={`Student Dashboard`} />
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

        <Paginate pages={pages} page={page} setPaginatePage={setPaginatePage} />
      </div>
    </>
  );
};

export default Dashboard;
