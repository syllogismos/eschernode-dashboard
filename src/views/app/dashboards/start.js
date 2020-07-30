import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Progress, Card, CardBody, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import ProfileComponent from '../../../components/profile/ProfileComponent';
import StatCard from '../../../containers/home/StatCard';
import { servicePath } from '../../../constants/defaultValues';
import { sourceFields } from '../../../constants/filter';
import ProfileListComponent from '../../../components/profile/ProfileListComponent';

const NavButtons = () => <></>;

const Start = ({ match, twitterUser, user }) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const { followers_count } = twitterUser.additionalUserInfo.profile;

  useEffect(() => {
    const query = {
      _source: sourceFields,
      size: 30,
      query: {
        bool: {
          must: [
            {
              term: {
                escher_account: twitterUser.additionalUserInfo.profile.id_str,
              },
            },
            { exists: { field: 'profile_image_url_https' } },
          ],
        },
      },
    };
    const data = JSON.stringify({
      uid: user,
      query,
      index: 'followers',
    });
    const config = {
      method: 'post',
      url: `${servicePath}execute_es_search_query`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    axios(config)
      .then((response) => {
        console.log(response);
        setUsers(response.data.es_response.hits.hits);
        setUserCount(response.data.es_response.hits.total.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, twitterUser.additionalUserInfo.profile.id_str]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.start" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" lg="8">
          <Row>
            <Colxx className="mb-4">
              <StatCard usersCount={userCount} />
            </Colxx>
          </Row>
          <Row>
            <Colxx>
              <div className="mb-4">
                <p className="mb-2">
                  Downloading Followers Progress
                  <span className="float-right text-muted">
                    {userCount}/{followers_count}
                  </span>
                </p>
                <Progress
                  value={((userCount + 1) / (followers_count + 1)) * 100}
                />
              </div>
            </Colxx>
          </Row>
          <Row>
            <Colxx>
              <Card>
                <CardBody>
                  <NavLink to="/app/profile/settings">
                    <Button color="primary" outline className="mr-2 mb-2">
                      Start Indexing Followers.
                    </Button>
                  </NavLink>
                  <NavLink to="/app/segmentation/filter">
                    <Button color="primary" outline className="mr-2 mb-2">
                      Filter Your Followers
                    </Button>
                  </NavLink>
                  <NavLink to="/app/campaigns/start">
                    <Button color="primary" outline className="mr-2 mb-2">
                      Start a targetted Messaging Campaign
                    </Button>
                  </NavLink>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
        <Colxx xxs="12" lg="4" className="mb-4">
          <ProfileComponent />
        </Colxx>
      </Row>
      <Separator className="mb-2" />
      <Row>
        {users.length > 0 ? (
          <Colxx xxs="12">
            <h3>Your Followers</h3>

            <ProfileListComponent profiles={users} totalHits={userCount} />
          </Colxx>
        ) : (
          <></>
        )}
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { twitterUser, user } = authUser;
  return { twitterUser, user };
};
export default connect(mapStateToProps, {})(Start);
