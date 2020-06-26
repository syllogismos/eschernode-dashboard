import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './landing';

const Main = ({ twitterUser, match }) => {
  console.log(match);
  return !twitterUser ? <Landing /> : <Redirect to="/app" />;
};

const mapStateToProps = ({ authUser }) => {
  // console.log(match);
  const { twitterUser } = authUser;
  return { twitterUser };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Main);
