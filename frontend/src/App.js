
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
/** @format */

import React from "react";

const App = () => {
  return (
    <div className='container'>
      <h1 className='text-center text-success'>ClassRoom</h1>
      <p className='text-danger text-center'>Starts from 20-12-2021</p>
    </div>
  );
};

export default App;
