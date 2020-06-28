import React from 'react';
import { Row } from 'reactstrap';
import ReactGA from 'react-ga';
import JumbotronUi from '../components/landing/jumbotron';
import { Colxx } from '../components/common/CustomBootstrap';
import Footer from '../containers/navs/Footer';

const Landing = () => {
  // useEffect(() => {
  //   document.body.classList.add('background');
  //   document.body.classList.add('no-footer');

  //   return () => {
  //     document.body.classList.remove('background');
  //     document.body.classList.remove('no-footer');
  //   };
  // }, []);
  ReactGA.pageview('/landingpage');

  return (
    <>
      <div
        id="app-container"
        className="menu-sub-hidden main-hidden sub-hidden"
      >
        <main>
          <Row>
            <Colxx xxs="12">
              <JumbotronUi />
            </Colxx>
          </Row>
        </main>
        <Footer className="menu-sub-hidden main-hidden sub-hidden" />
      </div>
    </>
  );
};

export default Landing;
