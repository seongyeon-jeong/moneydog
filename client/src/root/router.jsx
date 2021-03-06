import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRouter from './privateRouter';
import { Home, Report, Dashboard, SignUp, SignIn, Subscribing, SubscribingInfo, Recommend, Info, Spinner } from '../pages';

import './router.css';

class Router extends Component {
  render() {
    return (
      <>
        <div className="router">
          <Route exact path="/" component={Home} />
          <Switch>
            {/* user */}
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/spinner" component={Spinner} />
            <PrivateRouter path="/user/report" component={Report} />
            <PrivateRouter path="/user/info" component={Info} />
            <PrivateRouter path="/user/dashboard" component={Dashboard} />
            <PrivateRouter path="/user/subscribing" component={Subscribing} />
            <PrivateRouter path="/user/subscribing-info" component={SubscribingInfo} />
            <PrivateRouter path="/user/recommend" component={Recommend} />
          </Switch>
        </div>
      </>
    );
  }
}

export default Router;
