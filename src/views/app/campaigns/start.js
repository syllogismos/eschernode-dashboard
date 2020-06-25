import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Nav, NavItem, Button, TabPane, TabContent } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

const Start = ({ match }) => {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Campaigns" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'new',
                  'nav-link': true,
                })}
                onClick={() => {
                  setActiveTab('new');
                }}
                location={{}}
                to="#"
              >
                New Campaign
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'past',
                  'nav-link': true,
                })}
                onClick={() => {
                  setActiveTab('past');
                }}
                location={{}}
                to="#"
              >
                Past Campaigns
              </NavLink>
            </NavItem>
          </Nav>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser, filters }) => {
  const { user, twitterUser } = authUser;
  return { user, twitterUser, filters };
};

export default connect(mapStateToProps, {})(Start);
