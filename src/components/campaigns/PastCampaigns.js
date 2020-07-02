import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Card, CardTitle, CardBody } from 'reactstrap';
import moment from 'moment';
import { servicePath } from '../../constants/defaultValues';
import { Colxx, Separator } from '../common/CustomBootstrap';
import CampaignListView from './CampaignListView';
import CampaignStats from './CampaignStats';
import FiltersParseComponent from '../filters/FiltersParseComponent';
import ComposeDM from '../../containers/campaigns/composeDM';

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
      {campaignId !== '' ? (
        <>
          <Row>
            <Colxx xxs="12">
              <Card>
                <CardBody>
                  <Row>
                    <Colxx xxs="5">
                      <Row className="mb-2">
                        <Colxx>
                          <Card>
                            <CardBody>
                              <CardTitle>
                                Name: {campaignId.data.campaignName}
                              </CardTitle>
                              <p>
                                Started:{' '}
                                {moment(campaignId.created_at).fromNow()}
                              </p>
                              <p>Campaing Id: {campaignId.cid}</p>
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx>
                          <FiltersParseComponent
                            filters={campaignId.data.filters.filters}
                          />
                        </Colxx>
                      </Row>
                    </Colxx>
                    <Colxx xxs="7">
                      <ComposeDM
                        dm={campaignId.data.dm}
                        linkCheck={campaignId.data.linkCheck}
                        selectedDropdown={campaignId.data.selectedDropdown}
                        text={campaignId.data.text}
                        url={campaignId.data.url}
                        disabled
                      />
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
          <Row className="mb-4">
            <Colxx xxs="12">
              <CampaignStats campaign={campaignId} />
            </Colxx>
          </Row>
        </>
      ) : (
        <></>
      )}
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
      <Separator className="mb-2" />
    </>
  );
};

export default PastCampaigns;
