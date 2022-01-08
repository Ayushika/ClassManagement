/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userAction";
import pustak from "../../images/pustak-sm.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  /* Logout */
  const handleLogout = () => {
    dispatch(logout(history));
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" id="header">
        <Container>
          <Link to="/" className="custom-link">
            <Navbar.Brand className="font-bold text-success h1">
              <img
                src={pustak}
                alt="Pustak"
                style={{ width: "25%", height: "25%" }}
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo && userInfo.email ? (
                <NavDropdown
                  title={userInfo && userInfo.name}
                  id="adminmenu"
                  className="custom-link"
                >
                  <NavDropdown.Item>
                    <Link
                      className="dropdown-item nav-link custom-link"
                      to={`/${userInfo.role.toLowerCase()}/dashboard`}
                    >
                      Dashboard
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      className="dropdown-item nav-link custom-link"
                      to={`/update-profile/${userInfo._id}`}
                    >
                      See Profile
                    </Link>
                  </NavDropdown.Item>
                  {userInfo && userInfo.role.includes("Instructor") && (
                    <NavDropdown.Item>
                      <Link
                        className="dropdown-item nav-link custom-link"
                        to="/instructor/course/create"
                      >
                        Create Course
                      </Link>
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item>
                    <div
                      className="dropdown-item nav-link custom-link pointer"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="nav-link custom-link">
                  <i className="fas fa-user"></i> Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
