import GET_PLAYER_INFO from './types';

const getPlayerInfo = (name, email) => {
  return {
    type: GET_PLAYER_INFO,
    name,
    email,
  };
}

export default getPlayerInfo;
