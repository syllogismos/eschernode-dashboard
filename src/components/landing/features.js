import React from 'react';
import { Row, Card, CardBody, Jumbotron, CardImg } from 'reactstrap';
import { Colxx } from '../common/CustomBootstrap';

const Features = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              <Jumbotron>
                <h1 className="display-4">Features</h1>
                <img
                  src="/assets/eschernode/filters.png"
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
