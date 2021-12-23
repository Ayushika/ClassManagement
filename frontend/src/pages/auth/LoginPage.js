/** @format */

import React, { useState } from "react";
import Meta from "../../components/Meta";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userAction";
import { Row, Col, Button, Form, Container } from "react-bootstrap";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password, history));
  };

  return (
    <div>
      <Meta title="ClassRoom : Login" />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h3 className="text-success mt-5">Sign In</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mt-4">
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="mt-4">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" className=" btn btn-success btn-md mt-3">
                Sign In
              </Button>
            </Form>
            <Row className="py-2">
              <Col>
                <Link to="/forgot-password" className="custom-link text-muted">
                  Forget Password ?
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
