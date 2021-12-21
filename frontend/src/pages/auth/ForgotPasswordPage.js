import React, { useState } from "react";
import Meta from "../../components/Meta";
import { Row, Col, Button, Form, Container } from "react-bootstrap";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div>
      <Meta title="Forgot Password ?" />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2>Forgot Password ?</h2>
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
              {success && (
                <>
                  <Form.Group controlId="otp" className="mt-3">
                    <Form.Label>Otp</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
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
                </>
              )}
              <Button type="submit" variant="dark mt-4">
                {success ? "Reset Password" : "Send Otp"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
