import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ThumbListView from './ThumbListView';

function collect(props) {
  return { data: props.data };
}

const ListProfileListing = ({
  items,
  displayMode,
  currentPage,
  totalPage,
  onChangePage,
}) => {
  return (
    <>
      <Row>
        {items.map((profile) => {
          if (displayMode === 'imagelist') {
            return (
              <ThumbListView
                key={profile._id}
                profile={profile}
                collect={collect}
              />
            );
          }
          if (displayMode === 'thumblist') {
            return (
              <ThumbListView
                key={profile._id}
                profile={profile}
                collect={collect}
              />
            );
          }
          return (
            <ThumbListView
              key={profile._id}
              profile={profile}
              collect={collect}
            />
          );
        })}
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={(i) => onChangePage(i)}
        />
      </Row>
    </>
  );
};

export default React.memo(ListProfileListing);
