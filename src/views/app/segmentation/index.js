import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

const Filter = React.lazy(() =>
  import(/* webpackChunkName: "filter" */ './filter')
);
const Custom = React.lazy(() =>
  import(/* webpackChunkName: "custom" */ './custom')
);
const Segmentation = ({ match }) => {
  ReactGA.pageview('/filters');
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/filter`} />
        <Route
          path={`${match.url}/filter`}
          render={(props) => <Filter {...props} />}
        />
        <Route
          path={`${match.url}/custom`}
          render={(props) => <Custom {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};
export default Segmentation;
