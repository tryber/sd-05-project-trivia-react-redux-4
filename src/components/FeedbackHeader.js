import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class FeedbackHeader extends Component {
  render() {
    const avatar = localStorage.getItem('token');

    return (
      <div>
        <header>
          <img
            src={`https://www.gravatar.com/avatar/${md5(avatar).toString()}`}
            alt="player avatar"
            data-testid="header-profile-picture"
          />
          <h1 data-testid="header-player-name">Fulano</h1>
          <p data-testid="header-score">2</p>
        </header>
        <p data-testid="feedback-text">Podia ser melhor...</p>
      </div>
    );
  }
}

export default FeedbackHeader;
