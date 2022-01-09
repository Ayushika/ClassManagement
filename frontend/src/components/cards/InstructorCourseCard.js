import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const InstructorCourseCard = ({ course }) => {
  return (
    <Link
      to={`/instructor/course/${course.slug}`}
      style={{ textDecoration: "none" }}
    >
      <Card className="mt-3 p-2 rounded pointer">
        <Card.Img
          src={course.image.Location}
          variant="top"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title as="div">
            <p className="text-dark">{course.title.toUpperCase()}</p>
          </Card.Title>

          <Card.Text as="p" className="text-muted">
            <i className="fas fa-university p-1"></i> Batch: {course.batch.year}{" "}
            - {course.batch.section}
          </Card.Text>
          <Card.Text as="p" className="text-muted">
            <i className="fas fa-video p-1"></i> Lessons :{" "}
            {course.lessons.length}
          </Card.Text>
          <Card.Text as="p" className="text-muted">
            <i className="fas fa-file-pdf p-1"></i> Announcements:{" "}
            {course.announcements.length}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default InstructorCourseCard;
