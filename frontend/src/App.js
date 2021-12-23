/** @format */

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/layout/Header";

//auth Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/auth/ForgotPasswordPage"),
);

//admin pages
const AdminDashboardPage = lazy(() => import("./pages/admin/Dashboard"));

//admin pages
const StudentDashboardPage = lazy(() => import("./pages/student/Dashboard"));

//admin pages
const InstructorDashboardPage = lazy(() =>
  import("./pages/instructor/Dashboard"),
);

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className='col text-center p-5 display-4'>ClassRoom....</div>
        }>
        <Header />
        <ToastContainer position='top-center' />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route
                exact
                path='/forgot-password'
                component={ForgotPasswordPage}
              />
              <Route
                exact
                path='/admin/dashboard'
                component={AdminDashboardPage}
              />
              <Route
                exact
                path='/student/dashboard'
                component={StudentDashboardPage}
              />
              <Route
                exact
                path='/instructor/dashboard'
                component={InstructorDashboardPage}
              />
            </Switch>
          </Container>
        </main>
      </Suspense>
    </Router>
  );
};

export default App;
