import { combineReducers } from 'redux';

import playerReducer from './playerReducer';
import gameReducer from './gameReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  playerReducer,
  gameReducer,
  settingsReducer,
});

export default rootReducer;
