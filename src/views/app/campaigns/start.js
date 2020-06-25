import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Nav,
  NavItem,
  Button,
  TabPane,
  TabContent,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';
import { servicePath } from '../../../constants/defaultValues';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import FiltersParseComponent from '../../../components/filters/FiltersParseComponent';
import ComposeDM from '../../../containers/campaigns/composeDM';
import { NotificationManager } from '../../../components/common/react-notifications';

const Start = ({ match, filters, user, twitterUser }) => {
  const [activeTab, setActiveTab] = useState('new');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [dm, setDM] = useState('');
  const [testModal, setTestModal] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState('');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Server Error', 3000, null, null);
      setError('');
    }
  }, [error]);
  useEffect(() => {
    setLoading(true);
    const data = JSON.stringify({
      uid: user,
      filters: filters.filters,
      size: 0,
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
        if (response.data.status === 200) {
          setCount(response.data.es_response.hits.total.value);
        } else {
          setError(`${response.data.message} Fix it in Filters Page`);
        }
        setLoading(false);
      })
      .catch((er) => {
        setLoading(false);
        setError('Server Error');
        console.log(er);
      });
  }, [
    filters.filters,
    twitterUser.additionalUserInfo.profile.id_str,
    user,
    count,
  ]);
  function checkFilters() {
    // this will trigger the useEffect clause to update the count
    setCount(0);
  }

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
          <TabContent activeTab={activeTab}>
            <TabPane tabId="new">
              <Row>
                <Colxx xxs="12" lg="8">
                  <Row>
                    <Colxx>
                      <FiltersParseComponent
                        className="mb-4"
                        filters={filters.filters}
                      />
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <ComposeDM dm={dm} setDM={setDM} />
                    </Colxx>
                  </Row>
                </Colxx>
                <Colxx xxs="12" lg="4">
                  <Row>
                    <Colxx>
                      <Card>
                        <CardBody className="text-center">
                          <NavLink to="/app/segmentation/filter">
                            <Button color="primary" className="mb-2 mr-1">
                              Edit Filter
                            </Button>
                          </NavLink>
                          <Button
                            color="primary"
                            className={`mb-2 btn-shadow btn-multiple-state ${
                              loading ? 'show-spinner' : ''
                            }`}
                            onClick={checkFilters}
                          >
                            <span className="spinner d-inline-block">
                              <span className="bounce1" />
                              <span className="bounce2" />
                              <span className="bounce3" />
                            </span>
                            <span className="label">Check Filter</span>
                          </Button>
                        </CardBody>
                      </Card>
                      <div className="icon-cards-row">
                        <div className="icon-row-item mb-4">
                          <Card>
                            <CardBody className="text-center">
                              <i className="simple-icon-people" />
                              <p className="card-text font-weight-semibold mb-0">
                                Users in this Filter
                              </p>
                              <p className="lead text-center">{count}</p>
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <Card>
                        <CardBody className="text-center">
                          <Button
                            className="mb-2 mr-1"
                            color="primary"
                            onClick={() => setTestModal(true)}
                          >
                            Test Message
                          </Button>
                          <Modal
                            isOpen={testModal}
                            toggle={() => setTestModal(!testModal)}
                          >
                            <ModalHeader>Send a Test DM.</ModalHeader>
                            <ModalBody>
                              Twitter Handle:{' '}
                              <Input
                                value={twitterHandle}
                                onChange={(evt) =>
                                  setTwitterHandle(evt.target.value)
                                }
                              />
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="primary"
                                onClick={() => setTestModal(false)}
                              >
                                Send
                              </Button>{' '}
                              <Button
                                color="secondary"
                                onClick={() => setTestModal(false)}
                              >
                                Cancel
                              </Button>
                            </ModalFooter>
                          </Modal>
                          <Button className="mb-2" color="secondary">
                            Start Campaign
                          </Button>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </Colxx>
              </Row>
              {/* <Row>
                <Colxx xxs="12" lg="8">
                  <ComposeDM />
                </Colxx>
              </Row> */}
            </TabPane>
            <TabPane tabId="past">
              <p>Past Campaigns</p>
            </TabPane>
          </TabContent>
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
