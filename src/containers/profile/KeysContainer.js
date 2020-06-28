import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { connect } from 'react-redux';
import { servicePath } from '../../constants/defaultValues';
import { NotificationManager } from '../../components/common/react-notifications';

const KeysContainer = (props) => {
  const [userDetails, setUserDetails] = useState({
    api_key: '',
    api_secret: '',
    access_token: '',
    access_token_secret: '',
    twitter_id: '',
    index_status: '',
  });
  const [loading, setLoading] = useState(false);
  const { user, twitterUser } = props;
  useEffect(() => {
    console.log('handling get');
    setLoading(true);

    async function fetchData() {
      const data = JSON.stringify({
        uid: user,
      });
      const config = {
        method: 'post',
        url: `${servicePath}get_user_details`,
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      };
      const result = await axios(config);
      if (result.data.status === 200) {
        setUserDetails((k) => {
          return { ...k, ...result.data.userdetails };
        });
        console.log(result);
      }
      setLoading(false);
      console.log(result);
    }
    fetchData();
  }, [user]);
  const initialValues = {
    apiKey: userDetails.api_key,
    apiSecret: userDetails.api_secret,
    accessToken: userDetails.access_token,
    accessTokenSecret: userDetails.access_token_secret,
  };

  function handleUpdate(values) {
    setLoading(true);
    if (userDetails.index_status === 'indexing') {
      NotificationManager.warning(
        'Cant update keys when you are downloading users',
        'Update Error',
        3000,
        null,
        null,
        ''
      );
      setLoading(false);
      return;
    }
    const data = JSON.stringify({
      uid: user,
      data: {
        api_key: userDetails.api_key,
        api_secret: userDetails.api_secret,
        access_token: userDetails.access_token,
        access_token_secret: userDetails.access_token_secret,
        twitter_id: twitterUser.additionalUserInfo.profile.id_str,
      },
    });
    const config = {
      method: 'post',
      url: `${servicePath}update_user_details`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  function handleStartIndexing() {
    setUserDetails((u) => {
      return { ...u, index_status: 'indexing' };
    });
    const data = JSON.stringify({
      uid: user,
    });
    const config = {
      method: 'post',
      url: `${servicePath}start_index_users`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log('error while calling calling index users url');
        console.log(err);
        setUserDetails((u) => {
          return { ...u, index_status: '' };
        });
      });
  }

  function handleChange(evt) {
    const { value } = evt.target;
    setUserDetails({ ...userDetails, [evt.target.name]: value });
  }
  return (
    <>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>Twitter Secret Keys</CardTitle>

          <Formik initialValues={initialValues} onSubmit={handleUpdate}>
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <FormGroup className="form-group has-float-label">
                  <Label>Api key</Label>
                  <Field
                    disabled={loading}
                    className="form-control"
                    name="api_key"
                    value={userDetails.api_key}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Api secret</Label>
                  <Field
                    disabled={loading}
                    className="form-control"
                    name="api_secret"
                    value={userDetails.api_secret}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Access token</Label>
                  <Field
                    disabled={loading}
                    className="form-control"
                    name="access_token"
                    value={userDetails.access_token}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Access token secret</Label>
                  <Field
                    disabled={loading}
                    className="form-control"
                    name="access_token_secret"
                    value={userDetails.access_token_secret}
                    onChange={handleChange}
                  />
                </FormGroup>
                <Label>
                  You don't need to put in your keys to start indexing your
                  followers
                </Label>
                <Button
                  color="primary"
                  type="submit"
                  className={`btn-shadow mr-2 btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  size="lg"
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">Update</span>
                </Button>
                <Button
                  type="button"
                  size="lg"
                  disabled={loading || userDetails.index_status === 'indexing'}
                  className="mr-2"
                  onClick={handleStartIndexing}
                >
                  {userDetails.index_status === 'indexing'
                    ? 'Indexing Followers'
                    : 'Start Indexing Followers'}
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { twitterUser, user } = authUser;
  return { user, twitterUser };
};

export default connect(mapStateToProps, {})(KeysContainer);
