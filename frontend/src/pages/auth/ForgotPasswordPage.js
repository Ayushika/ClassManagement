/** @format */

import React, { useState } from "react";
import Meta from "../../components/Meta";
import { Row, Col, Button, Form, Container, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, forgotPassword } from "../../actions/userAction";
import {
  USER_FORGOT_PASSWORD_RESET,
  USER_VERIFY_EMAIL_RESET,
} from "../../constants/userConstants";
import Loading from "../../components/Loading";

const ForgotPasswordPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const { otp: code, loading: loadingOtp } = userVerifyEmail;

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { loading: loadingForgot } = userForgotPassword;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Otp is required");
      return;
    }
    if (otp !== code) {
      toast.error("Invalid Otp");
      return;
    }

    dispatch(forgotPassword(email, password));
    history.push("/login");
    toast.success("Password Reset Successfully. Now you can Login");
    dispatch({ type: USER_VERIFY_EMAIL_RESET });
    dispatch({ type: USER_FORGOT_PASSWORD_RESET });

    setSuccess(false);
  };
  const handleOtp = (e) => {
    e.preventDefault();
    toast.success(`otp sent on ${email}`);
    dispatch(verifyEmail(email));
    setSuccess(true);
  };

  return (
    <div>
      <Meta title="Forgot Password ?" />
      {loadingOtp && <Loading />}
      {loadingForgot && <Loading />}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h3 className="text-success mt-5">Forgot Password ?</h3>
            <Form onSubmit={success ? handleSubmit : handleOtp}>
              <Form.Group controlId="email" className="mt-4">
                <Form.Control
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={success}
                ></Form.Control>
              </Form.Group>
              {success && (
                <>
                  <Form.Group controlId="otp" className="mt-4">
                    <Form.Control
                      type="text"
                      placeholder="Enter Otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="password" className="mt-4">
                    <InputGroup className="mb-3">
                      <Form.Control
                        type={visible ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                      <InputGroup.Text
                        onClick={() => setVisible(!visible)}
                        className="pointer"
                      >
                        {visible ? (
                          <i className="fas fa-eye"></i>
                        ) : (
                          <i className="fas fa-eye-slash"></i>
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </>
              )}
              <Button
                type="submit"
                className="btn btn-success btn-md mt-3"
                disabled={!email || loadingOtp || loadingForgot}
                onClick={success ? handleSubmit : handleOtp}
              >
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
