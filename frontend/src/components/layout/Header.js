/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
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
      <Navbar bg='light' expand='lg' id='header'>
        <Container>
          <Link to='/' className='custom-link'>
            <Navbar.Brand className='font-bold text-success h1'>
              <img src={pustak} alt='logo' style={{ width: "32%" }} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo && userInfo.email ? (
                <>
                  {userInfo.role === "Admin" ? (
                    <Link
                      to='/admin/dashboard'
                      className=' nav-link custom-link'>
                      Dashboard
                    </Link>
                  ) : userInfo.role === "Student" ? (
                    <Link
                      to='/student/dashboard'
                      className=' nav-link custom-link'>
                      Dashboard
                    </Link>
                  ) : userInfo.role === "Instructor" ? (
                    <Link
                      to='/instructor/dashboard'
                      className=' nav-link custom-link'>
                      Dashboard
                    </Link>
                  ) : null}
                  <div
                    className='nav-link custom-link pointer'
                    onClick={() => handleLogout()}>
                    <i className='fas fa-sign-out-alt'></i> Logout
                  </div>
                </>
              ) : (
                <Link to='/login' className='nav-link custom-link'>
                  <i className='fas fa-user'></i> Login
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
