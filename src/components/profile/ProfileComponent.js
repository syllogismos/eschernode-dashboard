import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardImg } from 'reactstrap';

const ProfileComponent = ({ twitterUser }) => {
  const profileInfo = twitterUser.additionalUserInfo.profile;
  const profileImageURL = profileInfo.profile_image_url.replace(
    'normal',
    '400x400'
  );
  const twitterURL = `https://twitter.com/${twitterUser.additionalUserInfo.username}`;
  return (
    <>
      <Card className="mb-4">
        <CardBody>
          <CardImg
            top
            src={profileImageURL}
            alt="Card image cap"
            className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
          />
          <p className="text-muted text-small mb-2">About</p>
          <p className="mb-3">{profileInfo.description}</p>
          <p className="text-muted text-small mb-2">Location</p>
          <p className="mb-3">{profileInfo.location}</p>
          <p className="text-muted text-small mb-2">Followers</p>
          <p className="mb-3">{profileInfo.followers_count}</p>
          <p className="text-muted text-small mb-2">Friends</p>
          <p className="mb-3">{profileInfo.friends_count}</p>
          <p className="text-muted text-small mb-2">Contact</p>
          <div className="social-icons">
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item">
                <a href={twitterURL}>
                  <i className="simple-icon-social-twitter" />
                </a>
              </li>
              {profileInfo.url ? (
                <li className="list-inline-item">
                  <a href={profileInfo.url}>
                    <i className="simple-icon-globe" />
                  </a>
                </li>
              ) : (
                <p />
              )}
            </ul>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { twitterUser } = authUser;
  return { twitterUser };
};

export default connect(mapStateToProps, {})(ProfileComponent);
