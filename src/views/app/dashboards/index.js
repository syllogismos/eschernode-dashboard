import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

const Start = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './start')
);
const Dashboards = ({ match }) => {
  ReactGA.pageview('/home');
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
        <Route
          path={`${match.url}/start`}
          render={(props) => <Start {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Dashboards;
