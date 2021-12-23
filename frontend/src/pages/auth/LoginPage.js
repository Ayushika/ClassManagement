import React, { useState } from "react";
import Meta from "../../components/Meta";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
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
