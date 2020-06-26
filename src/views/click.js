import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { servicePath } from '../constants/defaultValues';
import qs from 'qs';

const Click = ({ location }) => {
  // useEffect(() => {
  //   document.body.classList.add('background');
  //   document.body.classList.add('no-footer');

  //   return () => {
  //     document.body.classList.remove('background');
  //     document.body.classList.remove('no-footer');
  //   };
  // }, []);
  const urlparams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const data = JSON.stringify(urlparams);
  const config = {
    method: 'post',
    url: `${servicePath}click_track`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
  try {
    axios(config)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    urlparams.u
      ? (window.location.href = decodeURIComponent(urlparams.u))
      : console.log('no url');
  } catch {
    console.log('on click');
  }
  return (
    <>
      <div
        id="app-container"
        className="menu-sub-hidden main-hidden sub-hidden"
      >
        <main>
          <Redirect to="/app" />
        </main>
        {/* <Footer className="menu-sub-hidden main-hidden sub-hidden" /> */}
      </div>
    </>
  );
};

export default Click;
