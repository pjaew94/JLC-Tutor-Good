import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


import "./App.css";

// Redux
import { Provider } from "react-redux";
import store from "./store";


import Navbar from "./components/layout/Navbar";
import NavbarM from './components/layout/NavbarM'
import Recommendations from "./components/layout/Recommendations";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Courses from "./components/layout/Courses";
import PostsRoute from './components/layout/Posts/PostsRoute.jsx'
import Alert from './components/layout/Alert';
import Teachers from './components/layout/Teachers';
import Profile from './components/layout/Profile.jsx';
import PrivateRoute from './components/routing/PrivateRoute'

import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  // MediaQueries
  const isMobile = useMediaQuery({ query: "(max-device-width: 430px)" });



  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Login} />
          <Alert />
          <Navbar />
          <NavbarM />
          <Recommendations />
          <PrivateRoute exact path='/courses/:id' component={PostsRoute} />
          <Switch>
            <PrivateRoute exact={isMobile ? true : false} path="/courses" component={Courses} />
            <PrivateRoute exact path='/teachers' component={Teachers} />
            <PrivateRoute exact path='/profile' component={Profile} />
            
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
