import React, { Component } from 'react';
import Timer from './Timer';
import './Components.css';

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array#6274398
function shuffle(correct, incorrect) {
  const array = [correct, ...incorrect];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      questions: [],
      shuffled: [],
      questionIndex: 0,
      rightAnswer: '',
      wrongAnswer: '',
      hidden: true,
    };
  }

  async componentDidMount() {
    await fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((obj) => obj.results)
      .then((data) => {
        this.setState({ questions: [...data] });
      });
    const { questions } = this.state;
    const shuffled = [...questions];
    for (let i = 0; i < shuffled.length; i += 1) {
      shuffled[i] = shuffle(shuffled[i].correct_answer, shuffled[i].incorrect_answers);
    }
    this.setShuffledState(shuffled);
  }

  setShuffledState(array) {
    this.setState({
      shuffled: array,
      loading: false,
    });
  }

  nextQuestion() {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      rightAnswer: '',
      wrongAnswer: '',
      hidden: true,
    }));
  }

  // https://stackoverflow.com/questions/41978408/changing-style-of-a-button-on-click
  highlightAnswers() {
    this.setState({
      rightAnswer: 'right-answer',
      wrongAnswer: 'wrong-anwser',
      hidden: false,
    });
  }

  rightAnswerButton(correctAnswer, rightAnswer) {
    return (
      <button
        data-testid="correct-answer" className={rightAnswer}
        onClick={() => this.highlightAnswers()}
      >
        {correctAnswer}
      </button>
    );
  }

  wrongAnswerButton(wrongAnswer, answer, index) {
    return (
      <button
        data-testid={`wrong-answer-${index}`} className={wrongAnswer}
        onClick={() => this.highlightAnswers()}
      >
        {answer}
      </button>
    );
  }

  triviaQuestionsAndAnswers() {
    const { questions, questionIndex, rightAnswer, wrongAnswer, shuffled, hidden } = this.state;
    return (
      <div>
        {questions
          .filter((_, filter) => filter === questionIndex)
          .map((trivia) => {
            const { category, correct_answer: correctAnswer, question } = trivia;
            return (
              <section>
                <p data-testid="question-category">{category}</p>
                <p data-testid="question-text">{question}</p>
                {shuffled[questionIndex].map((answer, index) =>
                  (answer === correctAnswer ? (
                    this.rightAnswerButton(correctAnswer, rightAnswer)
                  ) : (
                    this.wrongAnswerButton(wrongAnswer, answer, index)
                  )),
                )}
                <button data-testid="btn-next" hidden={hidden} onClick={() => this.nextQuestion()}>
                  Próxima
                </button>
              </section>
            );
          })}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return !loading ? (
      <div>
        <Timer />
        {this.triviaQuestionsAndAnswers()}
      </div>
    ) : (
      <h1>Loading...</h1>
    );
  }
}

export default GameScreen;
