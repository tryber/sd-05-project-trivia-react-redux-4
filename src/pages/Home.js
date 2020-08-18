import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tokenRequest from '../service/api';

function configButton() {
  return (
    <Link to="/settings">
      <button type="button" data-testid="btn-settings">
        Configurações
      </button>
    </Link>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
  }

  inputForm() {
    const { name, email } = this.state;
    return (
      <form>
        <label htmlFor="player-email">E-mail do Gravatar</label>
        <input
          type="email" id="player-email"
          data-testid="input-gravatar-email"
          value={email}
          onChange={(event) => this.setState({ email: event.target.value })}
        />
        <label htmlFor="player-name">Nome do jogador</label>
        <input
          type="text" id="player-name"
          data-testid="input-player-name"
          value={name}
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            onClick={() => tokenRequest()}
            disabled={(name.length && email.length) === 0}
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }

  render() {
    return (
      <section>
        {this.inputForm()}
        {configButton()}
      </section>
    );
  }
}

export default Home;
