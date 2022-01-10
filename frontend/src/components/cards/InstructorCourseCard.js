/** @format */

import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteCourse } from "../../actions/courseAction";
import { useDispatch } from "react-redux";

const InstructorCourseCard = ({ course }) => {
  const dispatch = useDispatch();

  const handleDeleteCourse = () => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(deleteCourse(course._id, course.instructor._id));
    }
  };

  return (
    <Card className='mt-3 p-2 rounded pointer'>
      <Link
        to={`/instructor/course/${course.slug}`}
        style={{ textDecoration: "none" }}>
        <Card.Img
          src={course.image.Location}
          variant='top'
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title as='div'>
            <p className='text-dark'>{course.title.toUpperCase()}</p>
          </Card.Title>

          <Card.Text as='p' className='text-muted'>
            <i className='fas fa-university p-1'></i> Batch: {course.batch.year}{" "}
            - {course.batch.section}
          </Card.Text>
          <Card.Text as='p' className='text-muted'>
            <i className='fas fa-video p-1'></i> Lessons :{" "}
            {course.lessons.length}
          </Card.Text>
          <Card.Text as='p' className='text-muted'>
            <i className='fas fa-file-pdf p-1'></i> Announcements:{" "}
            {course.announcements.length}
          </Card.Text>
        </Card.Body>
      </Link>
      <span
        className='btn btn-md text-center text-danger'
        onClick={() => handleDeleteCourse()}>
        Delete Course
      </span>
    </Card>
  );
};

export default InstructorCourseCard;
