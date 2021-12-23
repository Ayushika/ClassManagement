import React, { useState } from "react";
import Meta from "../../components/Meta";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
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

  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const { otp: code, loading: loadingOtp } = userVerifyEmail;

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { success: successReset, loading: loadingForgot } = userForgotPassword;

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
    if (successReset) {
      toast.success("Password Reset Successfully. Now you can Login");
      dispatch({ type: USER_VERIFY_EMAIL_RESET });
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
      history.push("/login");
      setSuccess(false);
    }
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
            <h2 className="text-success">Forgot Password ?</h2>
            <Form onSubmit={success ? handleSubmit : handleOtp}>
              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={success}
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
              <Button
                type="submit"
                className="btn btn-success mt-3"
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