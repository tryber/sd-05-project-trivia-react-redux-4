import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: 30 };
  }
  // https://www.w3schools.com/howto/howto_js_countdown.asp
  timerCountdown() {
    const { timer } = this.state;
    setTimeout(() => {
      if (timer > 0) {
        this.setState({
          timer: timer - 1,
        });
        if (timer === 0) {
          clearTimeout();
        }
      }
    }, 1000);
  }

  render() {
    const { timer } = this.state;
    return (
      <section>
        {this.timerCountdown()}
        <h3>{timer}</h3>
      </section>
    );
  }
}

export default Timer;
