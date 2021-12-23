/** @format */

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/layout/Header";
import Loading from "./components/Loading";

//auth Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/auth/ForgotPasswordPage")
);


const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
//admin pages
const AdminDashboardPage = lazy(() => import("./pages/admin/Dashboard"));
const AdminRoute = lazy(() =>
  import("./components/protectedRoutes/AdminRoute"),
);

//admin pages
const AdminDashboardPage = lazy(() => import("./pages/admin/Dashboard"));
const StudentDashboardPage = lazy(() => import("./pages/student/Dashboard"));
const InstructorDashboardPage = lazy(() =>
  import("./pages/instructor/Dashboard")
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Header />
        <ToastContainer position="top-center" />
        <main className="py-3">
          <Container>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPasswordPage}
              />
              <AdminRoute
                exact
                path="/admin/dashboard"
                component={AdminDashboardPage}
              />
              <Route
                exact
                path="/student/dashboard"
                component={StudentDashboardPage}
              />
              <Route
                exact
                path="/instructor/dashboard"
                component={InstructorDashboardPage}
              />
              <Route exact path="/*" component={NotFoundPage} />
            </Switch>
          </Container>
        </main>
      </Suspense>
    </Router>
  );
};

export default App;
