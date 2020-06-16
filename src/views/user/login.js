import React, { useEffect } from 'react';
import { Row, Card, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { NotificationManager } from '../../components/common/react-notifications';

import { loginUserTwitter } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const Login = ({ history, loading, error, loginUserTwitterAction }) => {
  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const onUserLoginTwitter = (values) => {
    if (!loading) {
      loginUserTwitterAction(values, history);
    }
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">ESCHERNODE</p>
            <p className="white mb-0">
              MESSAGE AUTOMATION PLATFORM FOR SOCIAL MEDIA INFLUENCERS
            </p>
          </div>
          <div className="form-side">
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="lg"
              onClick={onUserLoginTwitter}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="user.login-button-twitter" />
              </span>
            </Button>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserTwitterAction: loginUserTwitter,
})(Login);
