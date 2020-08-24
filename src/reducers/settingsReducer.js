import { CHOOSE_CATEGORY, CHOOSE_DIFFICULTY, CHOOSE_QUESTION_TYPE } from '../actions/types';

const INITIAL_STATE = {
  category: [],
  difficulty: '',
  type: '',
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHOOSE_CATEGORY:
      return { ...state, category: action.category };
    case CHOOSE_DIFFICULTY:
      return { ...state, difficulty: action.difficulty };
    case CHOOSE_QUESTION_TYPE:
      return { ...state, type: action.questionType };
    default:
      return state;
  }
};

export default settingsReducer;
