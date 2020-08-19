import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class GameHeader extends Component {
  render() {
    const avatar = localStorage.getItem('token');
    const { name, score } = this.props;

    return (
      <header>
        <img
          src={`https://www.gravatar.com/avatar/${md5(avatar).toString()}`}
          alt="player avatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <p data-testid="header-score">{score}</p>
      </header>
    )
  };
}

const mapStateToProps = (state) => {
  return {
    name: state.playerReducer.name,
    score: state.playerReducer.score,
  };
}

export default connect(mapStateToProps)(GameHeader);
