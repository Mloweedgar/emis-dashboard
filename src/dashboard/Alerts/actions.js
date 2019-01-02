import { alertsToGeoJson, alertToGeoJson } from './helpers';

/*
 *------------------------------------------------------------------------------
 * Alerts action types
 *------------------------------------------------------------------------------
 */

/*  fetch action types */
export const GET_ALERTS_START = 'GET_ALERTS_START';
export const GET_ALERTS_SUCCESS = 'GET_ALERTS_SUCCESS';
export const GET_ALERTS_ERROR = 'GET_ALERTS_ERROR';
export const SET_SELECTED_ALERT = 'SET_SELECTED_ALERT';

/*
 *------------------------------------------------------------------------------
 * Map action types
 *------------------------------------------------------------------------------
 */

export const STORE_MAP_POINTS = 'STORE_ALERTS_AS_MAP_POINTS';
export const SET_SHOWPOINTS_VALUE = 'SET_SHOWPOINTS_VALUE';
export const SET_SELECTED_GEOJSON = 'SET_SELECTED_GEOJSON';
export const SET_SHOW_SELECTED_GEOJSON = 'SET_SHOW_SELECTED_GEOJSON';
export const SAVE_DRAWN_GEOMETRY = 'SAVE_DRAWN_GEOMETRY';

/*
 *------------------------------------------------------------------------------
 * Alerts action creators
 *------------------------------------------------------------------------------
 */

/**
 * Action dispatched to fetch alerts from the API
 *
 * @function
 * @name getAlertsStart
 *
 * @returns {Object} - Redux action for fetching alerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAlertsStart() {
  return {
    type: GET_ALERTS_START,
  };
}

/**
 * Action dispatched when fetching alerts from that API is successfully
 *
 * @function
 * @name getAlertsSuccess
 *
 * @param {Object[]} alerts - Array of alerts from API
 * @param {number} page - page the results is from
 * @param {number} total - total number of alerts in the API
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAlertsSuccess(alerts, page = 1, total = 0) {
  return {
    type: GET_ALERTS_SUCCESS,
    payload: {
      data: alerts,
    },
    meta: {
      page,
      total,
    },
  };
}

/**
 * Action dispatched when alert marker is clicked on map
 *
 * @function
 * @name setSelectedAlert
 *
 * @param {Object} alert - selected alert
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function setSelectedAlert(selected) {
  return {
    type: SET_SELECTED_ALERT,
    payload: {
      data: selected,
    },
  };
}

/**
 * Action dispatched when fetching alerts from that API fails
 *
 * @function
 * @name getAlertsError
 *
 * @param {Object} error - Error object when fetching alerts fails
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAlertsError(error) {
  return {
    type: GET_ALERTS_ERROR,
    payload: {
      data: error,
    },
    error: true,
  };
}

/*
 *------------------------------------------------------------------------------
 * Map action creators
 *------------------------------------------------------------------------------
 */

/**
 * Action dispatched when alerts have been converted to map points
 *
 * @function
 * @name storeMapPoints
 *
 * @param {Array} alerts
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function storeMapPoints(points) {
  return {
    type: STORE_MAP_POINTS,
    payload: {
      data: points,
    },
  };
}

/**
 * Action dispatched to toggle show pointLayer on map
 *
 * @function
 * @name showPointsLayer
 *
 * @param {boolean} showPoints
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function setShowPiontsValue(showPoints) {
  return {
    type: SET_SHOWPOINTS_VALUE,
    payload: {
      data: showPoints,
    },
  };
}

/**
 * Action dispatched to save drawn geometry on map
 *
 * @function
 * @name saveDrawnGeometry
 *
 * @param {object} geometry
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function saveDrawnGeometry(geometry) {
  return {
    type: SAVE_DRAWN_GEOMETRY,
    payload: {
      data: geometry,
    },
  };
}

/**
 * Action dispatched to toggle show polygonsLayer on map
 *
 * @function
 * @name setShowSelectedGeojson
 *
 * @param {boolean} showPoints
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function setShowSelectedGeojson(showPolygons) {
  return {
    type: SET_SHOW_SELECTED_GEOJSON,
    payload: {
      data: showPolygons,
    },
  };
}

/**
 * Action dispatched when alert marker is clicked on map
 *
 * @function
 * @name setSelectedGeoJson
 *
 * @param {Object} alertShape - shape to be drawn on map(Eg. Polygon or Cirlce)
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function setSelectedGeoJson(geoJson = []) {
  return {
    type: SET_SELECTED_GEOJSON,
    payload: {
      data: geoJson,
    },
  };
}

/*
 * -----------------------------------------------------------------------------
 * Thunks
 * -----------------------------------------------------------------------------
 */

/**
 * A Thunk function which perform asynchronous fetching of alerts from the API
 *
 * @function
 * @name getAlerts
 *
 * @param {Object} params - Params to pass to the API client
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAlerts() {
  return (dispatch, getState, { API }) => {
    dispatch(getAlertsStart());

    return API.getAlerts()
      .then(({ data: res }) => {
        const alertsPoints = alertsToGeoJson(res.data);
        dispatch(getAlertsSuccess(res.data, res.page, res.total));
        dispatch(storeMapPoints(alertsPoints));
        dispatch(setShowPiontsValue(true));
      })
      .catch(err => dispatch(getAlertsError(err)));
  };
}

/**
 * A Thunk function which which uses alert id to find alert object from array of alerts
 * stored in state
 *
 * @function
 * @name getSelectedAlertFromState
 *
 * @param {string} selectedAlertId - Id of alert selected
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getSelectedAlertFromState(selectedAlertId = null) {
  return (dispatch, getState) => {
    if (selectedAlertId === null) {
      dispatch(setSelectedAlert(null));
      dispatch(setSelectedGeoJson());
    } else {
      const state = getState();
      const {
        alerts: { data },
      } = state;
      const alert = data.find(({ _id }) => selectedAlertId === _id);
      const polygon = alertToGeoJson(alert, 'Polygon');
      dispatch(setSelectedAlert(alert));
      dispatch(setSelectedGeoJson([polygon]));
    }
  };
}

/**
 *Thunk function that toggles show of alert points layer
 *
 * @function
 * @name showAlertPoints
 *
 * @param {boolean} showPoints - flag for show/hide alerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function showAlertPoints(showPoints) {
  return dispatch => {
    dispatch(setShowPiontsValue(showPoints));
  };
}

/**
 *Thunk function that  toggles show of alert points layer
 *
 * @function
 * @name showSeleteAlertShape
 *
 * @param {boolean} showShapes - flag for show/hide alerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function showSeleteAlertShape(showShapes) {
  return dispatch => {
    dispatch(setShowSelectedGeojson(showShapes));
  };
}

/**
 *Thunk function that  saves drawn geometry to state
 *
 * @function
 * @name saveDrawnGeometryOperation
 *
 * @param {object} geometry
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function saveDrawnGeometryOperation(geometry) {
  return dispatch => {
    dispatch(saveDrawnGeometry(geometry));
  };
}
