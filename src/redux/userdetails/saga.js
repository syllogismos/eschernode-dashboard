// import { GET_USER_DETAILS, UPDATE_USER_DETAILS } from '../actions';
// import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

// var axios = require('axios');

// // axios(config)
// // .then(function (response) {
// //   console.log(JSON.stringify(response.data));
// // })
// // .catch(function (error) {
// //   console.log(error);
// // });

// import {
//   updateUserDetailsSuccess,
//   updateUserDetailsError,
//   getUserDetailsSuccess,
//   getUserDetailsError,
//   getUserDetails,
// } from './actions';
// import { takeEvery } from 'redux-saga/effects';

// const apiUrl = `https:localhost/api/get_user_details/`;

// export function* watchGetUserDetails() {
//   yield takeEvery(GET_USER_DETAILS, getUserDetails);
// }

// const getUserDetailsAsync = async (user_id) => {
//   var data = JSON.stringify({ uid: user_id });

//   var config = {
//     method: 'post',
//     url: 'http://127.0.0.1:8000/api/get_user_details/',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: data,
//   };

//   await axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// function* getUserDetails({ payload }) {
//   const { userId, userDetails } = payload;
// }
