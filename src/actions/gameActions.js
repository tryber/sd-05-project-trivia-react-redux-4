import { GET_GAME_TIMER } from './types';

const getGameTimer = (timer) => ({
  type: GET_GAME_TIMER,
  timer,
})

export default getGameTimer;
