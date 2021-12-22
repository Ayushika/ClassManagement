import React, { useState } from "react";
import Meta from "../../components/Meta";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Meta title="ClassRoom : Login" />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2 className="text-success">Sign In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" className=" btn btn-success mt-3">
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
