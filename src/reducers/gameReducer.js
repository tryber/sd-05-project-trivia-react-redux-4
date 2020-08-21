import { GET_GAME_TIMER } from '../actions/types';

const INITIAL_STATE = {
  timer: 30,
}

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_GAME_TIMER:
      return { ...state, timer: action.timer };
    default:
      return state;
  }
}

export default gameReducer;
