import React, { Component } from 'react';
import GameHeader from '../components/GameHeader';
import QuestionSection from '../components/QuestionSection';

class Game extends Component {
  render() {
    return (
      <div>
        <GameHeader />
        TRIVIA GAME
        <QuestionSection />
      </div>
    );
  }
}

export default Game;
