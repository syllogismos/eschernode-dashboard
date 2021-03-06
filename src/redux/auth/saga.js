import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { servicePath } from '../../constants/defaultValues';

import { auth, twitterAuthProvider } from '../../helpers/Firebase';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGIN_USER_TWITTER,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  loginUserTwitterSuccess,
  loginUserTwitterError,
} from './actions';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
  await auth
    .signInWithEmailAndPassword(email, password)
    .then((authUser) => authUser)
    .catch((error) => error);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      localStorage.setItem('user_id', loginUser.user.uid);
      yield put(loginUserSuccess(loginUser.user));
      history.push('/');
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchLoginUserTwitter() {
  yield takeEvery(LOGIN_USER_TWITTER, loginWithTwitter);
}

const updateUserDetails = async (twitterUser) => {
  const data = JSON.stringify({
    uid: twitterUser.user.uid,
    data: { twitterUser },
  });
  const config = {
    method: 'post',
    url: `${servicePath}update_user_details`,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };
  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data.message));
    })
    .catch((error) => {
      console.log('error while storing twitter data during signup', error);
    });
};

const loginWithTwitterAsync = async (provider) =>
  await auth
    .signInWithPopup(provider)
    .then((authUser) => {
      updateUserDetails(authUser);
      return authUser;
    })
    .catch((error) => error);

function* loginWithTwitter({ payload }) {
  const { history } = payload;
  try {
    const loginUserTwitter = yield call(
      loginWithTwitterAsync,
      twitterAuthProvider
    );
    if (!loginUserTwitter.message) {
      localStorage.setItem('user_id', loginUserTwitter.user.uid);
      localStorage.setItem('twitter_user', JSON.stringify(loginUserTwitter));
      yield put(loginUserTwitterSuccess(loginUserTwitter));
      // history.push('/');
    } else {
      yield put(loginUserTwitterError(loginUserTwitter.message));
    }
  } catch (error) {
    yield put(loginUserTwitterError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => authUser)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      localStorage.setItem('user_id', registerUser.user.uid);
      yield put(registerUserSuccess(registerUser));
      history.push('/');
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((authUser) => authUser)
    .catch((error) => error);
  history.push('/');
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    yield call(logoutAsync, history);
    localStorage.removeItem('user_id');
    localStorage.removeItem('twitter_user');
  } catch (error) {}
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchLoginUserTwitter),
  ]);
}
