import React, { useState } from 'react';
import { Row, Nav, NavItem, Button, TabPane, TabContent } from 'reactstrap';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import SingleFilterContainer from './SingleFilterContainer';
import ProfileListComponent from '../../components/profile/ProfileListComponent';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import { generateInitFilter } from '../../constants/filter';
import { servicePath } from '../../constants/defaultValues';

const FiltersContainer = (props) => {
  const [activeTab, setActiveTab] = useState('filter');

  const [filters, setFilters] = useState([generateInitFilter()]);

  const [getUsersLoading, setGetUsersLoading] = useState(false);

  const [profiles, setProfiles] = useState([]);
  const { user, twitterUser } = props;
  function handleDeleteFilter(i) {
    return () => setFilters((fs) => fs.filter((e, index) => index !== i));
  }

  function addFilter() {
    setFilters((fs) => fs.concat(generateInitFilter()));
  }

  function getUsers() {
    setGetUsersLoading(true);
    const data = JSON.stringify({
      uid: user,
      filters,
      id_str: twitterUser.additionalUserInfo.profile.id_str,
    });
    const config = {
      method: 'post',
      url: `${servicePath}get_filtered_users`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    axios(config)
      .then((response) => {
        setGetUsersLoading(false);
        // console.log(JSON.stringify(response.data));
        setProfiles(response.data.es_response.hits.hits);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Nav tabs className="separator-tabs ml-0 mb-5">
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === 'filter',
              'nav-link': true,
            })}
            onClick={() => {
              setActiveTab('filter');
            }}
            location={{}}
            to="#"
          >
            Filter
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === 'custom_filters',
              'nav-link': true,
            })}
            onClick={() => {
              setActiveTab('custom_filters');
            }}
            location={{}}
            to="#"
          >
            Custom Filters
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="filter">
          {filters.map((f, i) => (
            <Row key={f.id}>
              <Colxx xxs="12" lg="12" className="mb-4" key={f.id}>
                <SingleFilterContainer
                  filters={filters}
                  setFilters={setFilters}
                  closeButton={i > 0}
                  i={i}
                  key={f.id}
                  handleDeleteFilter={handleDeleteFilter}
                />
              </Colxx>
            </Row>
          ))}
          <Row>
            <Colxx>
              <Button
                className="btn calendar-prev-btn mb-2"
                onClick={addFilter}
              >
                <span className="simple-icon-plus" />
              </Button>{' '}
              <Button
                className="mb-2"
                outline
                color="primary"
                onClick={getUsers}
              >
                Get Users
              </Button>{' '}
              <Button className="mb-2" outline color="primary">
                Start Messaging Campaign
              </Button>{' '}
              <Button className="mb-2" outline color="primary">
                Save as Custom Filter
              </Button>
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12">
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            {profiles.length > 0 ? (
              <Colxx xxs="12">
                <ProfileListComponent profiles={profiles} />
              </Colxx>
            ) : (
              <></>
            )}
          </Row>
        </TabPane>
        <TabPane tabId="custom_filters">
          <Row>
            <Colxx xxs="12" lg="12" className="mb-4 col-left">
              {/* <SingleFilterContainer /> */}
            </Colxx>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { user, twitterUser } = authUser;
  return { user, twitterUser };
};

export default connect(mapStateToProps, {})(FiltersContainer);
