import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from "./components/layout/Header";

// Pages
const HomePage = lazy(() => import("./pages/HomePage"));

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="col text-center p-5 display-4">ClassRoom....</div>
        }
      >
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
