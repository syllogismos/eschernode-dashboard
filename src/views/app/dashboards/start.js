import React from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import ProfileComponent from '../../../components/profile/ProfileComponent';

const Start = ({ match }) => (
  <>
    <Row>
      <Colxx xxs="12">
        <Breadcrumb heading="menu.start" match={match} />
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="12" lg="8" className="mb-4">
        <p>
          <IntlMessages id="menu.start" />
        </p>
      </Colxx>
      <Colxx xxs="12" lg="4" className="mb-4">
        <ProfileComponent />
      </Colxx>
    </Row>
  </>
);
export default Start;
