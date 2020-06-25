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

const KeysContainer = (props) => {
  const [keys, setKeys] = useState({
    api_key: '',
    api_secret: '',
    access_token: '',
    access_token_secret: '',
    twitter_id: '',
  });
  const [loading, setLoading] = useState(false);
  const { user, twitterUser } = props;
  useEffect(() => {
    console.log('handling get');
    setLoading(true);

    async function fetchData() {
      var data = JSON.stringify({
        uid: user,
      });
      var config = {
        method: 'post',
        url: servicePath + 'get_user_details',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      const result = await axios(config);
      if (result.data.status === 200) {
        setKeys((k) => {
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
    apiKey: keys.api_key,
    apiSecret: keys.api_secret,
    accessToken: keys.access_token,
    accessTokenSecret: keys.access_token_secret,
  };

  function handleUpdate(values) {
    setLoading(true);
    const data = JSON.stringify({
      uid: user,
      data: {
        api_key: keys.api_key,
        api_secret: keys.api_secret,
        access_token: keys.access_token,
        access_token_secret: keys.access_token_secret,
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

  function handleChange(evt) {
    const { value } = evt.target;
    setKeys({ ...keys, [evt.target.name]: value });
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
                    value={keys.api_key}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Api secret</Label>
                  <Field
                    disabled={loading}
                    className="form-control"
                    name="api_secret"
                    value={keys.api_secret}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Access token</Label>
                  <Field
                    disabled={loading}
                    className="form-control"
                    name="access_token"
                    value={keys.access_token}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Access token secret</Label>
                  <Field
                    disabled={loading}
                    className="form-control"
                    name="access_token_secret"
                    value={keys.access_token_secret}
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button
                  color="primary"
                  type="submit"
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
                  <span className="label">Update</span>
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
