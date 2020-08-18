import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function inputForm() {
  return (
    <form>
      <label htmlFor="player-email">E-mail do Gravatar</label>
      <input type="email" id="player-email" data-testid="input-gravatar-email" />
      <label htmlFor="player-name">Nome do jogador</label>
      <input type="text" id="player-name" data-testid="input-player-name" />
      <Link to="/game">
        <button type="button" data-testid="btn-play">Jogar</button>
      </Link>
    </form>
  );
}

function configButton() {
  return (
    <Link to="/settings">
      <button type="button" data-testid="btn-settings">Configurações</button>
    </Link>
  );
}

class Home extends Component {
  render() {
    return (
      <section>
        {inputForm()}
        {configButton()}
      </section>
    );
  }
}

export default Home;
