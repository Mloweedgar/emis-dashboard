
import { STORE_STAKEHOLDERS, SELECTED_STAKEHOLDER, TOGGLE_LEFT_NAVIGATION_DRAWER } from './actions';
/**
 * Contacts Reducers
 */

const initialState = {
  filters: [],
  stakeholders: {
    data: [],
    total: 0,
    selected: {},
    isDrawerOpen: false,
  },
};
export function filters(state = initialState.filters, action) {
  return state;
}

export function contacts(state = initialState.stakeholders, action) {
  switch (action.type) {
    case STORE_STAKEHOLDERS:
      return Object.assign({}, state, {
        data: action.stakeholders,
        total: action.stakeholders.length,
      });
    case SELECTED_STAKEHOLDER:
      return Object.assign({}, state, {
        selected: action.stakeholder,
      });
    case TOGGLE_LEFT_NAVIGATION_DRAWER:
      return Object.assign({}, state, {
        isDrawerOpen: action.isDrawerOpen,
      });
    default:
      return state;
  }
}
