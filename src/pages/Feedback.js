import React from 'react';
import { Link } from 'react-router-dom';
import FeedbackHeader from '../components/FeedbackHeader';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <Link to="/game">
          <button data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/game">
          <button data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
