import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Card, CardBody } from 'reactstrap';
import axios from 'axios';
// import moment from 'moment';
import IconCard from '../cards/IconCard';
import { Colxx } from '../common/CustomBootstrap';
import { servicePath } from '../../constants/defaultValues';
import { TimeSeriesChart } from '../charts';

const dmsQuery = (cid) => {
  return {
    query: {
      match: {
        campaign: cid,
      },
    },
    size: 1000,
    sort: [
      {
        t: {
          order: 'asc',
        },
      },
    ],
  };
};

const clickquery = (cid) => {
  return {
    query: {
      match: {
        c: cid,
      },
    },
    size: 1000,
    sort: [
      {
        t: {
          order: 'asc',
        },
      },
    ],
  };
};

const conversionquery = (cid) => {
  return {
    query: {
      match: {
        c: cid,
      },
    },
    size: 1000,
    sort: [
      {
        t: {
          order: 'asc',
        },
      },
    ],
  };
};

const dmsIndex = 'dms*';
const clickIndex = 'click*';
const conversionIndex = 'conversion*';

const CampaignStats = ({ campaign, uid }) => {
  const [clicks, setClicks] = useState(0);
  const [clickData, setClickData] = useState([]);
  const [conversions, setConversions] = useState(0);
  const [conversionData, setConversionData] = useState([]);
  const [dms, setDms] = useState(0);
  const [dmsData, setDmsData] = useState([]);
  useEffect(() => {
    const data = JSON.stringify({
      index: dmsIndex,
      query: dmsQuery(campaign.cid),
      uid,
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
        console.log(response.data.es_response);
        setDms(response.data.es_response.hits.total.value);
        setDmsData(response.data.es_response.hits.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [campaign, uid]);
  useEffect(() => {
    const data = JSON.stringify({
      index: clickIndex,
      query: clickquery(campaign.cid),
      uid,
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
        console.log(response.data.es_response);
        setClicks(response.data.es_response.hits.total.value);
        setClickData(response.data.es_response.hits.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [campaign, uid]);
  useEffect(() => {
    const data = JSON.stringify({
      index: conversionIndex,
      query: conversionquery(campaign.cid),
      uid,
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
        console.log(response.data.es_response);
        setConversions(response.data.es_response.hits.total.value);
        setConversionData(response.data.es_response.hits.hits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [campaign, uid]);
  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Colxx>
              <IconCard
                className="mb-0"
                icon="iconsminds-mail-send"
                title="Messages Sent"
                value={dms}
              />
            </Colxx>
            <Colxx>
              <IconCard
                className="mb-0"
                icon="iconsminds-twitter"
                title="Clicks"
                value={clicks}
              />
            </Colxx>

            <Colxx>
              <IconCard
                className="mb-0"
                icon="iconsminds-male-female"
                title="Conversions"
                value={conversions}
              />
            </Colxx>
          </Row>
          <Row>
            <TimeSeriesChart
              data={{
                clicks: clickData.map((d, i) => {
                  return { x: d._source.t, y: i };
                }),
                conversions: conversionData.map((d, i) => {
                  return { x: d._source.t, y: i };
                }),
                dms: dmsData.map((d, i) => {
                  return { x: d._source.t, y: i };
                }),
              }}
            />
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { user: uid } = authUser;
  return { uid };
};
export default connect(mapStateToProps, {})(CampaignStats);
