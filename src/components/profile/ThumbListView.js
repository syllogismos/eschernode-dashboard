import React from 'react';
import { Colxx } from '../common/CustomBootstrap';

const ThumbListView = ({ profile, collect }) => {
  return (
    <Colxx xxs="12" className="mb-3" key={profile.id}>
      {profile.id}
    </Colxx>
  );
};

export default ThumbListView;
