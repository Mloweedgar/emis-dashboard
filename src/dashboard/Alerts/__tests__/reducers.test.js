import * as Actions from '../actions';
import { alertsMap, alerts, alertsFilter } from '../reducers';
import { polygons, polygon } from '../../../common/data/alertTestData';

describe('Alerts:reducers', () => {
  describe('alertsFilter', () => {
    let previousState = null;
    beforeEach(() => {
      /* create initial state for Alerts Filter */
      previousState = {
        expectedAt: null,
        severity: null,
      };
    });

    it('should return default state when no initial alertsFilter state is provided', () => {
      expect(alertsFilter(undefined, {})).toEqual(previousState);
    });

    it('should return previous state when given invalid action type', () => {
      expect(
        alertsFilter(previousState, {
          type: null,
        })
      ).toEqual(previousState);
    });

    it(`should handle ${Actions.SET_EXPECTED_AT_FILTER}`, () => {
      const expectedAt = [];
      const action = {
        type: Actions.SET_EXPECTED_AT_FILTER,
        payload: {
          data: expectedAt,
        },
      };

      const expectedState = {
        ...previousState,
        expectedAt,
      };

      expect(alertsFilter(previousState, action)).toEqual(expectedState);
    });
  });
  describe('alertsMap', () => {
    let previousState = null;

    beforeEach(() => {
      /* create initial state for Alerts map */
      previousState = {
        center: [-6.179, 35.754],
        zoom: 7,
        points: [],
        shapes: [],
        drawnGeometry: null,
        showPoints: false,
        showShapes: false,
      };
    });

    it('should return default state when no initial alertsMap state is provided', () => {
      expect(alertsMap(undefined, {})).toEqual(previousState);
    });

    it('should return previous state when given invalid action type', () => {
      expect(
        alertsMap(previousState, {
          type: null,
        })
      ).toEqual(previousState);
    });

    it(`should handle ${Actions.SAVE_DRAWN_GEOMETRY}`, () => {
      const { geometry: drawnGeometry } = polygon;
      const action = {
        type: Actions.SAVE_DRAWN_GEOMETRY,
        payload: {
          data: drawnGeometry,
        },
      };

      const expectedState = {
        ...previousState,
        drawnGeometry,
      };

      expect(alertsMap(previousState, action)).toEqual(expectedState);
    });
    it(`should handle ${Actions.SET_SHOWPOINTS_VALUE}`, () => {
      const action = {
        type: Actions.SET_SHOWPOINTS_VALUE,
        payload: { data: true },
      };
      const showPoints = true;

      const expectedState = {
        ...previousState,
        showPoints,
      };
      expect(alertsMap(previousState, action)).toEqual(expectedState);
    });

    it(`should handle ${Actions.SET_SHOW_SELECTED_GEOJSON}`, () => {
      const action = {
        type: Actions.SET_SHOW_SELECTED_GEOJSON,
        payload: { data: true },
      };
      const showShapes = true;

      const expectedState = {
        ...previousState,
        showShapes,
      };
      expect(alertsMap(previousState, action)).toEqual(expectedState);
    });

    it(`should handle ${Actions.SET_SELECTED_GEOJSON}`, () => {
      const action = {
        type: Actions.SET_SELECTED_GEOJSON,
        payload: { data: polygons },
      };
      const shapes = polygons;

      const expectedState = {
        ...previousState,
        shapes,
      };

      expect(alertsMap(previousState, action)).toEqual(expectedState);
    });
    it(`should handle ${Actions.STORE_MAP_POINTS}`, () => {
      const alertMapPoints = [];

      const action = {
        type: Actions.STORE_MAP_POINTS,
        payload: { data: alertMapPoints },
      };

      const expectedState = {
        ...previousState,
      };

      expect(alertsMap(previousState, action)).toEqual(expectedState);
    });
  });

  describe('alerts', () => {
    let previousState = null;

    beforeEach(() => {
      /* create initial state for Alerts */
      previousState = {
        data: [],
        page: 1,
        total: 0,
        selected: null,
        loading: false,
        loadingSelected: false,
        filters: {},
        error: null,
      };
    });

    it('should return default state when no initial alert state is provided', () => {
      expect(alerts(undefined, {})).toEqual(previousState);
    });

    it('should return previous state when given invalid action type', () => {
      expect(
        alerts(previousState, {
          type: null,
        })
      ).toEqual(previousState);
    });

    it(`should handle ${Actions.GET_ALERT_START}`, () => {
      const nextState = {
        ...previousState,
        loadingSelected: true,
      };
      expect(alerts(previousState, { type: Actions.GET_ALERT_START })).toEqual(
        nextState
      );
    });

    it(`should handle ${Actions.GET_ALERT_SUCCESS}`, () => {
      const action = {
        type: Actions.GET_ALERT_SUCCESS,
        payload: {
          data: {},
        },
      };

      const nextState = {
        ...previousState,
        selected: action.payload.data,
      };

      expect(alerts(previousState, action)).toEqual(nextState);
    });

    it(`should handle ${Actions.GET_ALERT_ERROR}`, () => {
      const error = {
        status: 404,
        code: 404,
        name: 'Error',
        message: 'Not Found',
        developerMessage: 'Not Found',
        userMessage: 'Not Found',
        error: 'Error',
        error_description: 'Not Found',
      };

      const action = {
        type: Actions.GET_ALERT_ERROR,
        payload: { data: error },
        error: true,
      };

      const expectedState = {
        ...previousState,
        error: action.payload.data,
      };

      expect(alerts(previousState, action)).toEqual(expectedState);
    });

    it(`should handle ${Actions.GET_ALERTS_START}`, () => {
      const nextState = {
        ...previousState,
        loading: true,
      };
      expect(alerts(previousState, { type: Actions.GET_ALERTS_START })).toEqual(
        nextState
      );
    });

    it(`should handle ${Actions.GET_ALERTS_SUCCESS}`, () => {
      const action = {
        type: Actions.GET_ALERTS_SUCCESS,
        payload: {
          data: [],
        },
        meta: {
          page: 2,
          total: 200,
        },
      };

      const nextState = {
        ...previousState,
        data: [...action.payload.data],
        page: action.meta.page,
        total: action.meta.total,
      };

      expect(alerts(previousState, action)).toEqual(nextState);
    });

    it(`should handle ${Actions.GET_ALERTS_ERROR}`, () => {
      const error = {
        status: 404,
        code: 404,
        name: 'Error',
        message: 'Not Found',
        developerMessage: 'Not Found',
        userMessage: 'Not Found',
        error: 'Error',
        error_description: 'Not Found',
      };

      const action = {
        type: Actions.GET_ALERTS_ERROR,
        payload: { data: error },
        error: true,
      };

      const expectedState = {
        ...previousState,
        error: action.payload.data,
      };

      expect(alerts(previousState, action)).toEqual(expectedState);
    });
  });
});
