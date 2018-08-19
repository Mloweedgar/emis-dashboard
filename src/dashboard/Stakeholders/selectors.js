/**
 * Selectors  for stakeholders
 */
import { get } from 'lodash';

export const stakeholdersSelector = state => state && state.contacts && get(state, 'contacts.data');
export const isDrawerOpenSelector = state => state && stakeholdersSelector(state) && get(stakeholdersSelector(state), 'isDrawerOPen');
