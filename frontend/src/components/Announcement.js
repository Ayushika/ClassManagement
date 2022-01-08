import React from "react";
import { Button } from "react-bootstrap";

const Announcement = () => {
  return (
    <div>
      <p>Announcement</p>
      <Button type="button" className="btn btn-success mt-4">
        Add Announcement +
      </Button>
    </div>
  );
};

export default Announcement;
