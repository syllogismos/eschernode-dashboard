// import {
//   GET_USER_DETAILS,
//   UPDATE_USER_DETAILS,
//   GET_USER_DETAILS_SUCCESS,
// } from '../actions';

// const INIT_STATE = {
//   user_id: localStorage.getItem('user_id'),
//   api_key: '',
//   api_secret: '',
//   access_token: '',
//   access_token_secret: '',
//   twitter_id: '',
//   user_details_loading: false,
//   user_details_error: '',
// };

// export default (state = INIT_STATE, action) => {
//   switch (action.type) {
//     case GET_USER_DETAILS:
//       return { ...state, user_details_loading: true, user_details_error: '' };
//     case UPDATE_USER_DETAILS:
//       return { ...state, user_details_loading: true, user_details_error: '' };
//     case GET_USER_DETAILS_SUCCESS:
//       return {
//         ...state,
//         user_details_loading: false,
//         error: '',
//         ...action.payload.userDetails,
//       };
//     case UPDATE_USER_DETAILS_SUCCESS:
//       return {
//         ...state,
//         user_details_loading: false,
//         error: '',
//         ...action.payload.userDetails,
//       };
//     default:
//       return { ...state };
//   }
// };
