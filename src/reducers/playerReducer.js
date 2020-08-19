import GET_PLAYER_INFO from '../actions/types';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
}

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLAYER_INFO:
      return {
        ...state,
        name: action.name,
        gravatarEmail: action.email,
      }
    default:
      return state;
  };
}

export default playerReducer;
