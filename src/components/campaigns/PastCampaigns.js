import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'reactstrap';
import { servicePath } from '../../constants/defaultValues';
import CampaignListView from './CampaignListView';

const PastCampaigns = ({ campaignId, setCampaignId, uid }) => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const data = JSON.stringify({
      uid,
    });
    const config = {
      method: 'post',
      url: `${servicePath}get_latest_campaigns`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    axios(config)
      .then((response) => {
        console.log(response);
        setCampaigns(response.data.campaigns);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [campaignId, uid]);
  return (
    <>
      <Row>
        {campaigns.map((c) => {
          return (
            <CampaignListView
              key={c.cid}
              campaign={c}
              setCampaignId={setCampaignId}
              selectedCampaignId={campaignId}
            />
          );
        })}
      </Row>
    </>
  );
};

export default PastCampaigns;
