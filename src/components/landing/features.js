import React from 'react';
import { Row, Card, CardBody, Jumbotron, CardImg } from 'reactstrap';
import { Colxx, Separator } from '../common/CustomBootstrap';

const Features = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <Jumbotron>
                <h1 className="display-4">Filter your followers</h1>
                <p className="lead">
                  Create custom segments of your followers.
                </p>

                <img
                  src="/assets/eschernode/filters1.png"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <Jumbotron>
                <h1 className="display-4">Messaging Campaign</h1>
                <p className="lead">
                  Compose your message, send it to your target segment.
                </p>
                <img
                  src="/assets/eschernode/campaign1.png"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <Jumbotron>
                <h1 className="display-4">Campaign Stats</h1>
                <p className="lead">
                  Track, clicks and conversions of your campaign.
                </p>
                <img
                  src="/assets/eschernode/stats.png"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </Jumbotron>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Features;
