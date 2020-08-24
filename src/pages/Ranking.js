import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {

  render() {
    const playersList = JSON.parse(localStorage.getItem('ranking'));
    playersList.sort((a, b) => (a.score > b.score ? -1 : 1));
    return (
      <div>
        <h1 data-testid="ranking-title" >Ranking</h1>
        <Link to="/">
          <button data-testid="btn-go-home">
            Voltar para a tela de Início
          </button>
        </Link>
        <div>
          <ol>
            {playersList.map((player, index) =>
              <li>
                <p data-testid={`player-name-${index}`}>{player.name}</p>
                <p data-testid={`player-score-${index}`}>{player.score}</p>
              </li>,
            )}
          </ol>
        </div>
      </div>

    );
  }
}

export default Ranking;
