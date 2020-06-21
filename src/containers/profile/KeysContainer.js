import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';

const KeysContainer = () => {
  const [api_key] = useState('');
  const [api_secret] = useState('');
  const [access_token] = useState('');
  const [access_token_secret] = useState('');
  const loading = false;
  const initialValues = {
    api_key,
    api_secret,
    access_token,
    access_token_secret,
  };
  return (
    <>
      <Card className="mb-4">
        <CardBody>
          <CardTitle>Twitter Secret Keys</CardTitle>

          <Formik initialValues={initialValues}>
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <FormGroup className="form-group has-float-label">
                  <Label>Api key</Label>
                  <Field className="form-control" name="api_key" />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Api secret</Label>
                  <Field className="form-control" name="api_secret" />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Access token</Label>
                  <Field className="form-control" name="access_token" />
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>Access token secret</Label>
                  <Field className="form-control" name="access_token_secret" />
                </FormGroup>
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

export default KeysContainer;
