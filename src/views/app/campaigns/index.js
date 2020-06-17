import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Start = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './start')
);
const History = React.lazy(() =>
  import(/* webpackChunkName: "history" */ './history')
);
const Campaign = React.lazy(() =>
  import(/* webpackChunkName: "campaign" */ './campaign')
);
const Segmentation = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
      <Route
        path={`${match.url}/start`}
        render={(props) => <Start {...props} />}
      />
      <Route
        path={`${match.url}/history`}
        render={(props) => <History {...props} />}
      />
      <Route
        path={`${match.url}/campaign`}
        render={(props) => <Campaign {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Segmentation;
