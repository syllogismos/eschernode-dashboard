import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGIN_USER_TWITTER,
  LOGIN_USER_TWITTER_SUCCESS,
  LOGIN_USER_TWITTER_ERROR,
} from '../actions';

const INIT_STATE = {
  user: localStorage.getItem('user_id'),
  twitterUser: JSON.parse(localStorage.getItem('twitter_user')),
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload.uid, error: '' };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: '',
        error: action.payload.message,
      };
    case LOGIN_USER_TWITTER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_TWITTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user.uid,
        twitterUser: action.payload,
        error: '',
      };
    case LOGIN_USER_TWITTER_ERROR:
      console.log(action);
      return {
        ...state,
        loading: false,
        user: '',
        error: action.payload.message.message,
      };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: action.payload,
        resetPasswordCode: '',
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        newPassword: '',
        resetPasswordCode: '',
        error: action.payload.message,
      };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload.uid, error: '' };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: '',
        error: action.payload.message,
      };
    case LOGOUT_USER:
      return { ...state, user: null, twitterUser: null, error: '' };
    default:
      return { ...state };
  }
};
