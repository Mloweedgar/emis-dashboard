import {
  GET_PLANS_ERROR,
  GET_PLANS_START,
  GET_PLANS_SUCCESS,
  SELECT_PLAN,
} from './actions';

/*
 *------------------------------------------------------------------------------
 * Plan Reducers
 *------------------------------------------------------------------------------
 */

/**
 * Plans reducer
 * Is the field in the store which hold the loaded plans, total plans from the
 * API, current result page and the loading status for the plan
 *
 * @function
 * @name plans
 *
 * @param {Object} state={} - Initial state
 * @param {Object} action - Redux action object
 * @param {string} action.type - Action type
 * @param {Object} action.payload - Action payload
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function plans(state = {}, action) {
  switch (action.type) {
    case GET_PLANS_START:
      return Object.assign({}, state, { loading: true });
    case GET_PLANS_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload.data,
        page: action.meta.page,
        total: action.meta.total,
        loading: false,
      });
    case GET_PLANS_ERROR:
      return Object.assign({}, state, {
        error: action.payload.data,
        loading: false,
      });
    default:
      return state;
  }
}

/**
 * Selected plan reducer
 *
 * @function
 * @name selectedPlan
 *
 * @param {Object} state=null - Initial state
 * @param {Object} action - Redux action object
 * @param {string} action.type - Action type
 * @param {Object} action.payload - Action payload(data)
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function selectedPlan(state = null, action) {
  switch (action.type) {
    case SELECT_PLAN:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}

/**
 * planActivities reducer
 *
 * @function
 * @name planActivities
 *
 * @param {Object} state={} - Current store value for plan activities
 * @param {Object} action - Redux action
 * @returns {Object} planActivities - object which have plan activities and meta data
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function planActivities(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/**
 * selectedPlanActivity reducer
 *
 * @function
 * @name selectedPlanActivity
 *
 * @param {Object} state={} - Current store value for selectedPlanActivity
 * @param {action} action - Redux action
 * @returns {Object} selectedPlanActivity - selected plan object
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function selectedPlanActivity(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/**
 * planActivityProcedures reducer
 *
 * @function
 * @name planActivityProcedures
 *
 * @param {Object} state - Current store value for planActivityProcedures
 * @param {Object} action - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function planActivityProcedures(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
