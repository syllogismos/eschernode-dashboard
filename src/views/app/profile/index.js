import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

const Settings = React.lazy(() =>
  import(/* webpackChunkName: "settings" */ './settings')
);
const Profile = ({ match }) => {
  ReactGA.pageview('/profile');
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/settings`} />
        <Route
          path={`${match.url}/settings`}
          render={(props) => <Settings {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Profile;
