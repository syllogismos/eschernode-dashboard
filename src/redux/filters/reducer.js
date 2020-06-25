import { filterInitialState } from '../../constants/filter';

import { UPDATE_FILTERS } from '../actions';

const INIT_STATE = {
  filters: localStorage.getItem('current_filters')
    ? JSON.parse(localStorage.getItem('current_filters'))
    : [filterInitialState],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return { ...state, filters: action.payload };

    default:
      return { ...state };
  }
};
