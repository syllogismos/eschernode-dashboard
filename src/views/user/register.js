import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, FormGroup, Label, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { NotificationManager } from '../../components/common/react-notifications';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 7) {
    error = 'Password must be longer than 6 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Register = ({ history, loading, error, registerUserAction }) => {
  const [email] = useState('email');
  const [password] = useState('password');
  const [name] = useState('name');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Register Error',
        3000,
        null,
        null,
        ''
      );
    }
  }, [error]);

  const onUserRegister = (values) => {
    if (!loading) {
      if (email !== '' && password !== '') {
        // history.push('/');
        registerUserAction(values, history);
      }
    }
    // call registerUserAction()
  };

  const initialValues = { name, email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched }) => (
                <Form>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.fullname" />
                    </Label>
                    <Field type="name" className="form-control" name="name" />
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      type="email"
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      type="password"
                      className="form-control"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-center">
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <IntlMessages id="user.register-button" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
