import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import IconCard from '../../components/cards/IconCard';
import GlideComponent from '../../components/carousel/GlideComponent';
import { servicePath } from '../../constants/defaultValues';

const StatCard = ({
  className = 'icon-cards-row',
  twitterUser,
  usersCount,
  user,
}) => {
  const [dmsCount, setDmsCount] = useState(0);

  const profileInfo = twitterUser.additionalUserInfo.profile;
  // let d = new Date();
  // d.setDate(d.getDate() - 1);

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const dmsQuery = {
      size: 0,
      query: {
        bool: {
          must: [
            {
              term: {
                escher_account: profileInfo.id_str,
              },
            },
            {
              range: {
                created_at: {
                  gte: d,
                },
              },
            },
          ],
        },
      },
    };

    const data = JSON.stringify({
      uid: user,
      query: dmsQuery,
      index: 'dms*',
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
        setDmsCount(response.data.es_response.hits.total.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, profileInfo.id_str]);
  return (
    <div className={className}>
      <GlideComponent
        settings={{
          gap: 5,
          perView: 4,
          type: 'carousel',
          breakpoints: {
            320: { perView: 1 },
            576: { perView: 2 },
            1600: { perView: 3 },
            1800: { perView: 4 },
          },
          hideNav: true,
        }}
      >
        <div>
          <IconCard
            className="mb-4"
            icon="iconsminds-twitter"
            title="Followers"
            value={profileInfo.followers_count}
          />
        </div>
        <div>
          <IconCard
            className="mb-4"
            icon="iconsminds-mail-send"
            title="DM's sent in the last day"
            value={dmsCount}
          />
        </div>
        <div>
          <IconCard
            className="mb-4"
            icon="iconsminds-male-female"
            title="Users downloaded"
            value={usersCount}
          />
        </div>
      </GlideComponent>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { twitterUser, user } = authUser;
  return { twitterUser, user };
};

export default connect(mapStateToProps, {})(StatCard);
