import React from 'react';
import { Card, Badge } from 'reactstrap';
import classnames from 'classnames';
import { Colxx } from '../common/CustomBootstrap';

const ThumbListView = ({ profile }) => {
  const profileImageURL = profile._source.profile_image_url_https
    ? profile._source.profile_image_url_https.replace('normal', '400x400')
    : '';
  const profileUrl = profile._source.screen_name
    ? `https://twitter.com/${profile._source.screen_name}`
    : '';
  return (
    <Colxx xxs="12" className="mb-1" key={profile._id}>
      <Card className={classnames('d-flex flex-row', { active: true })}>
        <div className="d-flex">
          <a className="btn-link" href={profileUrl}>
            <img
              alt={profile._source.screen_name}
              src={profileImageURL}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </a>
        </div>
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <div className="w-15 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {profile._source.name ? profile._source.name : ''}
              </p>
            </div>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {profile._source.location ? profile._source.location : ''}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {profile._source.followers_count
                ? profile._source.followers_count
                : ''}{' '}
              followers
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {profile._source.friends_count
                ? profile._source.friends_count
                : ''}{' '}
              friends
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {profile._source.statuses_count
                ? profile._source.statuses_count
                : ''}{' '}
              tweets
            </p>
            <div className="w-15 w-sm-100">
              <Badge
                pill
                color={profile._source.verified ? `primary` : `secondary`}
              >
                {profile._source.verified ? `verified` : `not verified`}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

export default ThumbListView;

// const profileImageURL = profileInfo.profile_image_url_https.replace(
//   'normal',
//   '400x400'
// );
// "_source" : {
//   "follow_order" : 65,
//   "friends_count" : 1202,
//   "favourites_count" : 3807,
//   "verified" : false,
//   "description" : "Principal Researcher @ Microsoft Research AI. Robotics, Reinforcement Learning, Control, Vision and Autonomous Vehicles.",
//   "created_at" : "2011-07-25T15:56:59",
//   "profile_image_url_https" : "http://pbs.twimg.com/profile_images/590174349677703168/A8682S-s_normal.jpg",
//   "url" : "https://t.co/fh3fyvx1tI",
//   "muting" : false,
//   "screen_name" : "debadeepta",
//   "blocking" : false,
//   "statuses_count" : 443,
//   "id_str" : "342167747",
//   "followers_count" : 1071,
//   "name" : "Debadeepta Dey",
//   "location" : "Redmond, WA",
//   "status" : {
//     "created_at" : "2020-06-24T03:11:36"
//   }
// }
