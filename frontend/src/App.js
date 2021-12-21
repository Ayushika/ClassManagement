import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
import Header from "./components/layout/Header";

// Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/auth/ForgotPasswordPage")
);

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="col text-center p-5 display-4">ClassRoom....</div>
        }
      >
        <Header />
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
            </Switch>
          </Container>
        </main>
      </Suspense>
    </Router>
  );
};

export default App;
