import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  inputForm() {
    return (
      <form>
        <label htmlFor="player-email">E-mail do Gravatar</label>
        <input type="email" id="player-email" data-testid="input-gravatar-email" />
        <label htmlFor="player-name">Nome do jogador</label>
        <input type="text" id="player-name" data-testid="input-player-name" />
        <button type="button" data-testid="btn-play">Jogar</button>
      </form>
    )
  }

  configButton() {
    return (
      <Link to="/settings">
        <button type="button" data-testid="btn-settings">Configurações</button>
      </Link>
    );
  }

  render() {
    return (
      <section>
        {this.inputForm()}
        {this.configButton()}
      </section>
    )
  }
}

export default Home;
