import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Card, CardBody, Jumbotron, Button } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../common/CustomBootstrap';
import { loginUserTwitter } from '../../redux/actions';
import { NotificationManager } from '../common/react-notifications';

const JumbotronUi = ({
  history,
  loading,
  error,
  loginUserTwitterAction,
  loginUser,
}) => {
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
    <>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <Jumbotron>
                <h1 className="display-4">ESCHERNODE</h1>
                <p className="lead">
                  Messaging Automation for Social Media Influencers.
                </p>
                <hr className="my-4" />
                <p>
                  Send messages to targeted segments of your followers, track
                  conversions, unfollows, new followers. Schedule your messaging
                  campaigns through our dashboard seamlessly to increase
                  engagment.
                </p>
                <p className="lead mb-0">
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
                </p>
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { loading, error, twitterUser: loginUser } = authUser;
  return { loading, error, loginUser };
};

export default connect(mapStateToProps, {
  loginUserTwitterAction: loginUserTwitter,
})(JumbotronUi);
