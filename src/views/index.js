import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './landing';

const Main = ({ loginUser }) => {
  return !loginUser ? <Landing /> : <Redirect to="/app" />;
};

const mapStateToProps = ({ authUser }) => {
  const { user: loginUser } = authUser;
  return { loginUser };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Main);
