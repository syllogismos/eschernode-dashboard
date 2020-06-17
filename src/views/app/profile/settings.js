import React from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import ProfileCard from '../../../components/profile/ProfileCard';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import KeysCard from '../../../containers/profile/keyscard';

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
          <ProfileCard />
        </p>
      </Colxx>
      <Colxx lg="7" xxs="12" className="mb-4">
        <p>
          <KeysCard />
        </p>
      </Colxx>
    </Row>
  </>
);
export default Settings;
