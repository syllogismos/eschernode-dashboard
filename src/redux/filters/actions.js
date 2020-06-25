import { UPDATE_FILTERS } from '../actions';

export const updateFilters = (filters) => {
  localStorage.setItem('current_filters', JSON.stringify(filters));
  return {
    type: UPDATE_FILTERS,
    payload: filters,
  };
};
