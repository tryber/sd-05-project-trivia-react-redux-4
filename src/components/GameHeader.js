import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

export default class GameHeader extends Component {
  render() {
    const avatar = localStorage.getItem('token');

    return (
      <header>
        <img
          src={`https://www.gravatar.com/avatar/${md5(avatar).toString()}`}
          alt="player avatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">Player</h1>
        <p data-testid="header-score">0</p>
      </header>
    )
  };
}
