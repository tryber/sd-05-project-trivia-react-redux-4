import React from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

function playerRankings(avatar, results) {
  const newPlayer = {
    name: results.player.name,
    score: results.player.score,
    picture: avatar,
  };

  if (!localStorage.getItem('ranking')) {
    localStorage.setItem('ranking', JSON.stringify([newPlayer]));
    return;
  }
  const rankings = [...JSON.parse(localStorage.getItem('ranking')), newPlayer];
  localStorage.setItem('ranking', JSON.stringify(rankings));
}

const buttonRanking = (avatar, results) => (
  <button
    data-testid="btn-ranking"
    onClick={() => playerRankings(avatar, results)}
  >
    Ver Ranking
  </button>
);

class Feedback extends React.Component {

  render() {
    const avatar = localStorage.getItem('token');
    const results = JSON.parse(localStorage.getItem('state'));
    const message = results.player.assertions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...';
    return (
      <div>
        <header>
          <img
            src={`https://www.gravatar.com/avatar/${md5(avatar).toString()}`}
            alt="player avatar"
            data-testid="header-profile-picture"
          />
          <h1 data-testid="header-player-name">{results.player.name}</h1>
          <p data-testid="header-score">{results.player.score}</p>
        </header>
        <p data-testid="feedback-text">{message}</p>
        <h2 data-testid="feedback-total-score">{results.player.score}</h2>
        <h3 data-testid="feedback-total-question">
          {results.player.assertions}
        </h3>
        <Link to="/">
          <button data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          {buttonRanking(avatar, results)}
        </Link>
      </div>
    );
  }
}

export default Feedback;
