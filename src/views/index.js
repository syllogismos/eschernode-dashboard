import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './landing';

const Main = ({ twitterUser }) => {
  return !twitterUser ? <Landing /> : <Redirect to="/app" />;
};

const mapStateToProps = ({ authUser }) => {
  const { twitterUser } = authUser;
  return { twitterUser };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Main);
