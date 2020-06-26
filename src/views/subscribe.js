import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import qs from 'qs';
import axios from 'axios';
import { Colxx, Separator } from '../components/common/CustomBootstrap';
import Footer from '../containers/navs/Footer';
import { servicePath } from '../constants/defaultValues';
import { NotificationManager } from '../components/common/react-notifications';

const Subscribe = ({ location }) => {
  const [email, setEmail] = useState([]);
  const [validEmail, setValidEmail] = useState(false);
  const urlparams = qs.parse(location.search, { ignoreQueryPrefix: true });
  console.log(urlparams);
  const paths = location.pathname.split('/');
  const owner = paths[paths.length - 1];
  const data = JSON.stringify({ ...urlparams, email, owner });
  const config = {
    method: 'post',
    url: `${servicePath}subscribe_conversion`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
  const validateEmail = (value) => {
    let error = true;
    if (!value) {
      error = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = false;
    }
    return error;
  };
  const handleSubscribe = () => {
    validateEmail(email)
      ? axios(config)
          .then((response) =>
            NotificationManager.success('', 'Subscribed', 3000, null, null, '')
          )
          .catch((err) => console.log(err))
      : NotificationManager.warning(
          '',
          'Use Valid Email',
          3000,
          null,
          null,
          ''
        );
  };
  return (
    <>
      <div
        id="app-container"
        className="menu-sub-hidden main-hidden sub-hidden"
      >
        <main>
          <Row>
            <Colxx xxs="3" lg="3" />
            <Colxx xxs="6" lg="6" className="text-center">
              <Card>
                <CardTitle className="mt-3">
                  Subscribe to {owner}&apos;s mailing list
                </CardTitle>
                <Separator />
                <CardBody>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">Email</InputGroupAddon>

                    <Input
                      valid={validateEmail(email)}
                      onChange={(evt) => setEmail(evt.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={handleSubscribe}>
                        Subscribe
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="3" lg="3" />
          </Row>
        </main>
        <Footer className="main-hidden " />
      </div>
    </>
  );
};

export default Subscribe;
