import React, { Component } from 'react';

// function shuffleAnwsers(correct, incorrect) {
//   const alternatives = [...incorrect, correct].length;
//   const alternativesOrder = [];
//   for (let i = 0; i < alternatives; i += 1) {
//     alternativesOrder.push(Math.floor(Math.random() * alternatives));
//   }
// }

class QuestionSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      questions: [],
      index: 0,
      timer: 30,
    };
    this.timerCountdown = this.timerCountdown.bind(this);
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((obj) => obj.results)
      .then((data) => this.setState({ questions: [...data], loading: false }));
  }

  timerCountdown() {
    const { timer } = this.state
      if (timer > 0) {
        setTimeout(() => {
          this.setState({
            timer: timer - 1,
          });
        }, 1000);
      };
      if (timer === 0) {
        clearTimeout(timer);
      };
  };

  render() {
    const { questions, loading, timer } = this.state;
    return !loading ? (
      <div>
        {this.timerCountdown()}
        <section>
          <h3>{timer}</h3>
        </section>
        {questions.map((trivia) => {
          const { category, correct_answer: correctAnswer, question, incorrect_answers } = trivia;
          return (
            <section>
              <p data-testid="question-category">{category}</p>
              <p data-testid="question-text">{question}</p>
              <button data-testid="correct-answer">{correctAnswer}</button>
              {incorrect_answers.map((answer, index) => (
                <button data-testid={`wrong-answer-${index}`}>{answer}</button>
              ))}
            </section>
          );
        })}
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

export default QuestionSection;
