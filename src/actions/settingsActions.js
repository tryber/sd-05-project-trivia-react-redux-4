import { CHOOSE_CATEGORY, CHOOSE_DIFFICULTY, CHOOSE_QUESTION_TYPE } from './types';

export const categoryActions = (category) => ({
  type: CHOOSE_CATEGORY,
  category,
});

export const difficultyActions = (difficulty) => ({
  type: CHOOSE_DIFFICULTY,
  difficulty,
});

export const typeActions = (questionType) => ({
  type: CHOOSE_QUESTION_TYPE,
  questionType,
});
