/**
 *
 */

export const filterInitialState = {
  id: makeid(12),
  selectedFilter: '',
  twitterHandle: '',
  selectedCountry: '',
  followerCount: 0,
  followerCount1: 0,
  friendCount: 0,
  frinedCount1: 0,
  topicsCondition: {
    label: 'AND',
    value: 'and',
    key: 0,
  },
  twitterStringCondition: {
    label: 'Is',
    value: 'is',
    key: 0,
  },
  selectedNumberCondition: {
    label: 'Is Greater Than',
    value: 'isGreaterThan',
    key: 0,
  },
  followerCountCondition: {
    label: 'Is Greater Than',
    value: 'isGreaterThan',
    key: 0,
  },
  lastSeenCondition: {
    label: 'Is Greater Than',
    value: 'isGreaterThan',
    key: 0,
  },
  friendCountCondition: {
    label: 'Is Greater Than',
    value: 'isGreaterThan',
    key: 0,
  },
  // startDate: new Date(),
  // endDate: new Date(),
  topics: [],
};

export const filterCopy = JSON.parse(JSON.stringify(filterInitialState));

export function generateInitFilter() {
  var f = JSON.parse(JSON.stringify(filterInitialState));
  return { ...f, id: makeid(12) };
}

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}