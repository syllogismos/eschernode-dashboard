import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "views-gogo" */ './dashboards')
);
const Segmentation = React.lazy(() =>
  import(/* webpackChunkName: "views-second-menu" */ './segmentation')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "views-blank-page" */ './blank-page')
);

const Campaigns = React.lazy(() =>
  import(/* webpackChunkName: "views-campaigns" */ './campaigns')
);

const Profile = React.lazy(() =>
  import(/* webpackChunkName: "views-profile" */ './profile')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Redirect exact from={match.url} to={`${match.url}/dashboards`} />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/segmentation`}
              render={(props) => <Segmentation {...props} />}
            />
            <Route
              path={`${match.url}/campaigns`}
              render={(props) => <Campaigns {...props} />}
            />
            <Route
              path={`${match.url}/profile`}
              render={(props) => <Profile {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
