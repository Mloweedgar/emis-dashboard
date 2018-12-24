import { alertsMap, alerts } from '../reducers';

describe('Alerts:reducers', () => {
  describe('alertsMap', () => {
    let previousState = null;

    beforeEach(() => {
      /* create initial state for Alerts map */
      previousState = {
        center: [-6.179, 35.754],
        zoom: 7,
      };
    });

    it('should return default state when no initial alertsMap state is provided', () => {
      expect(alertsMap(undefined, {})).toEqual(previousState);
    });
  });

  describe('alerts', () => {
    let previousState = null;

    beforeEach(() => {
      /* create initial state for Alerts */
      previousState = {};
    });

    it('should return default state when no initial alert state is provided', () => {
      expect(alerts(undefined, {})).toEqual(previousState);
    });
  });
});