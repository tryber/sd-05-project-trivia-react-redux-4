import { GET_PLAYER_INFO, GET_PLAYER_SCORE } from '../actions/types';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLAYER_INFO:
      return {
        ...state,
        player: {
          ...state.player,
          name: action.player.name,
          gravatarEmail: action.player.email,
        },
      };
    case GET_PLAYER_SCORE:
      return {
        ...state,
        player: {
          ...state.player,
          assertions: action.player.assertions,
          score: action.player.score,
        },
      };
    default:
      return state;
  }
};

export default playerReducer;
