import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';

const FiltersParseComponent = ({ className = '', filters }) => {
  return (
    <>
      <Card className={className}>
        <CardBody>
          <CardTitle>Filter Description</CardTitle>
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {filters.map((f) => (
              <FilterParseComponent key={f.id} filter={f} />
            ))}
          </PerfectScrollbar>
        </CardBody>
      </Card>
    </>
  );
};

const FilterParseComponent = ({ filter }) => {
  function filterDescription(f) {
    if (f.selectedFilter === '') {
      return {
        description: 'Empty Filter',
        message: 'Select a Filter from the dropdown',
      };
    }
    switch (f.selectedFilter.value) {
      case 'allFollowers':
        return {
          description: 'Get All Followers',
          message:
            'This is a standalone filter, this filter shouldnt be used with other filters or more than once',
        };
      case 'twitterHandle':
        return {
          description: `User with Twitter Handle ${f.twitterHandle}`,
          message:
            'Get user with this handle, use this filter to send test campaigns',
        };
      case 'followerCount':
        switch (filter.followerCountCondition.value) {
          case 'isGreaterThan':
            return {
              description: `Users with follower count greater than ${f.followerCount}`,
              message: '',
            };
          case 'isLessThan':
            return {
              description: `Users with follower count less than ${f.followerCount}`,
              message: '',
            };
          default:
            return {
              description: `Users with follower count ranging from ${f.followerCount} to ${f.followerCount1}`,
            };
        }
      case 'friendCount':
        switch (filter.friendCountCondition.value) {
          case 'isGreaterThan':
            return {
              description: `Users with friend count greater than ${f.friendCount}`,
              message: '',
            };
          case 'isLessThan':
            return {
              description: `Users with friend count less than ${f.friendCount}`,
              message: '',
            };
          default:
            return {
              description: `Users with friend count ranging from ${f.friendCount} to ${f.friendCount1}`,
            };
        }
      case 'lastSeen':
        switch (filter.lastSeenCondition.value) {
          case 'isGreaterThan':
            return {
              description: `Users last seen greater than ${
                f.startDate ? moment(f.startDate).format('MMMM Do YYYY') : ''
              }`,
              message: '',
            };
          case 'isLessThan':
            return {
              description: `Users last seen less than ${
                f.startDate ? moment(f.startDate).format('MMMM Do YYYY') : ''
              }`,
              message: '',
            };
          default:
            return {
              description: `Users who were last seen from ${
                f.startDate ? moment(f.startDate).format('MMMM Do YYYY') : ''
              } to ${
                f.endDate ? moment(f.endDate).format('MMMM Do YYYY') : ''
              }`,
            };
        }
      case 'topics':
        switch (filter.topicsCondition.value) {
          case 'or':
            return {
              description: (
                <p>
                  Get users who mentions any of the topics{' '}
                  <strong>{f.topics}</strong> in their description or recent
                  status
                </p>
              ),
              message: '',
            };
          default:
            return {
              description: (
                <p>
                  Get users who mentions all of the topics{' '}
                  <strong>{f.topics}</strong> in their description or recent
                  status
                </p>
              ),
              message: '',
            };
        }
      case 'flag':
        switch (filter.flagCondition) {
          case 'is':
            switch (filter.flagOption.value) {
              case 'verified':
                return {
                  description: 'Get Users who are verified',
                  message: '',
                };
              default:
                return { description: 'Get Users who are muted', message: '' };
            }
          default:
            switch (filter.flagOption.value) {
              case 'verified':
                return {
                  description: 'Get Users who are not verified',
                  message: '',
                };
              default:
                return {
                  description: 'Get Users who are not muted',
                  message: '',
                };
            }
        }
      case 'country':
        return {
          description: `Get Users who are from ${f.selectedCountry.label}`,
          message: '',
        };
      default:
        return {
          description: 'This filter not supported yet',
          message: 'Select other Filter',
        };
    }
  }
  return (
    <div key={filter.id} className="d-flex flex-row mb-0 pb-1 border-bottom">
      <div className="pr-3">
        <p className="font-weight-medium mb-0">
          {filterDescription(filter).description}
        </p>
        <p className="text-muted mb-0 text-small">
          {filterDescription(filter).message}
        </p>
      </div>
    </div>
  );
};

export default FiltersParseComponent;

// export const filterInitialState = {
//     id: makeid(12),
//     selectedFilter: '',
//     twitterHandle: '',
//     selectedCountry: '',
//     followerCount: 0,
//     followerCount1: 0,
//     friendCount: 0,
//     friendCount1: 0,
//     topicsCondition: {
//       label: 'AND',
//       value: 'and',
//       key: 0,
//     },
//     twitterStringCondition: {
//       label: 'Is',
//       value: 'is',
//       key: 0,
//     },
//     selectedNumberCondition: {
//       label: 'Is Greater Than',
//       value: 'isGreaterThan',
//       key: 0,
//     },
//     followerCountCondition: {
//       label: 'Is Greater Than',
//       value: 'isGreaterThan',
//       key: 0,
//     },
//     lastSeenCondition: {
//       label: 'Is Greater Than',
//       value: 'isGreaterThan',
//       key: 0,
//     },
//     friendCountCondition: {
//       label: 'Is Greater Than',
//       value: 'isGreaterThan',
//       key: 0,
//     },
//     // startDate: new Date(),
//     // endDate: new Date(),
//     topics: [],
//   };
