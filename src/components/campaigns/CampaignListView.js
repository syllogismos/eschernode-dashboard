import React from 'react';
import { Card } from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import { Colxx } from '../common/CustomBootstrap';

const CampaignListView = ({ campaign, setCampaignId, selectedCampaignId }) => {
  const onClickHandler = () => {
    console.log(campaign.cid);
    setCampaignId(campaign.cid);
    console.log(campaign.cid === selectedCampaignId);
    console.log(selectedCampaignId);
  };
  return (
    <>
      <Colxx xxs="12" className="mb-1" key={campaign.cid}>
        <Card
          className={classnames('d-flex flex-row', {
            active: campaign.cid === selectedCampaignId,
          })}
          onClick={onClickHandler}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="w-30 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {campaign.data.campaignName}
                </p>
              </div>
              <p className="mb-1 text-muted  text-small w-75 w-sm-100">
                {campaign.data.dm}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {moment(campaign.created_at).fromNow()}
              </p>
            </div>
          </div>
        </Card>
      </Colxx>
    </>
  );
};

export default CampaignListView;
