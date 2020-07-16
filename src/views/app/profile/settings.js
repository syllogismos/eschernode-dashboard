import React from 'react';
import { Row } from 'reactstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import ProfileComponent from '../../../components/profile/ProfileComponent';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import KeysContainer from '../../../containers/profile/KeysContainer';
import CheckoutForm from '../../../components/stripe/CheckoutForm';

const promise = loadStripe('pk_test_JBG9RW0PyfsuT6YKL8cNvbqN');

const Settings = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.settings" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx lg="5" xl="4" xxs="12" className="col-left">
        <p>
          <ProfileComponent />
        </p>
      </Colxx>
      <Colxx lg="7" xxs="12" className="mb-4">
        <p>
          <KeysContainer />
        </p>
      </Colxx>
    </Row>
    {/* <Row>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Row> */}
  </>
);
export default Settings;
