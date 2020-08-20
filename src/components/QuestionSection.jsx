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
    };
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((obj) => obj.results)
      .then((data) => this.setState({ questions: [...data], loading: false }));
  }

  render() {
    const { questions, loading } = this.state;
    return !loading ? (
      <div>
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
