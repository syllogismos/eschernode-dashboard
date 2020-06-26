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
  friendCount1: 0,
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
  prioritiseBy: {
    label: 'Follow Order',
    value: 'followOrder',
    key: 0,
  },
  prioritiseCondition: {
    label: 'Descending',
    value: 'desc',
    key: 0,
  },
  flagOption: {
    label: 'Verified',
    value: 'verified',
    key: 0,
  },
  flagCondition: {
    label: 'Is',
    value: 'is',
    key: 0,
  },
};

export const sourceFields = [
  'id_str',
  'name',
  'screen_name',
  'location',
  'description',
  'url',
  'followers_count',
  'friends_count',
  'created_at',
  'verified',
  'statuses_count',
  'favourites_count',
  'status.created_at',
  'profile_image_url',
  'muting',
  'blocking',
  'follow_order',
  'escher_account',
];

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
