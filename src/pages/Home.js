import React, { Component } from 'react'

export class Home extends Component {
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
      <button type="button" data-testid="btn-settings"></button>
    );
  }

  render() {
    return (
      <div>
        {this.inputForm()}
      </div>
    )
  }
}

export default Home;
