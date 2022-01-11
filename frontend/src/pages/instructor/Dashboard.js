import React, { useEffect, useState } from "react";
import CourseCard from "../../components/cards/InstructorCourseCard";
import { getCourses } from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_CREATE_RESET } from "../../constants/courseConstants";
import { Col, Row } from "react-bootstrap";
import Paginate from "../../components/Paginate";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { courses, page, pages } = useSelector((state) => state.courseGetAll);
  const { success } = useSelector((state) => state.courseCreate);

  const [paginatePage, setPaginatePage] = useState(1);

  const value = "instructor";
  useEffect(() => {
    if (success) {
      dispatch({ type: COURSE_CREATE_RESET });
    }
    dispatch(getCourses(value, paginatePage));
  }, [dispatch, success, paginatePage]);

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
      <Row>
        <Paginate pages={pages} page={page} setPaginatePage={setPaginatePage} />
      </Row>
    </div>
  );
};

export default Dashboard;
