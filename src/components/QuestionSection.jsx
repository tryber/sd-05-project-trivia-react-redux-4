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

// https://stackoverflow.com/questions/41978408/changing-style-of-a-button-on-click

const highlightAnswers = () => {
  document.querySelector('.correct').classList.add('right-answer');
  const wrong = document.querySelectorAll('.wrong');
  for (let i = 0; i < wrong.length; i += 1) {
    wrong[i].style.border = '3px solid rgb(255, 0, 0)';
    // mudei pra inLineStyle pro CC pra de reclamar
    document.querySelector('#nextButton').toggleAttribute('hidden');
  }
};

const buttonWrongAwswer = (index, answer) => (
  <button
    data-testid={`wrong-answer-${index}`}
    className="button wrong"
    onClick={() => highlightAnswers()}
  >
    {answer}
  </button>
);

const buttonRigthAnswer = (correctAnswer) => (
  <button
    data-testid="correct-answer"
    className="button correct"
    onClick={() => highlightAnswers()}
  >
    {correctAnswer}
  </button>
);

const nextButton = (callBack) => (
  <button
    id="nextButton"
    data-testid="btn-next"
    hidden
    onClick={() => callBack()}
  >
    Próxima
  </button>
);

class QuestionSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      questions: [],
      idx: 0,
      // wrongAnswer: '',
      // rightAnswer: '',
      shuffledOrder: [],
    };
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=5')
    .then((response) => response.json())
    .then((obj) => obj.results)
    .then((data) => this.setState({ questions: [...data], loading: false }));
  }

  async nextQuestion() {
    document.querySelector('#nextButton').toggleAttribute('hidden');
    document.querySelector('.correct').classList.remove('right-answer');
    const buttonRemoveClass = await document.querySelectorAll('.button');
    for (let i = 0; i < buttonRemoveClass.length; i += 1) {
// buttonRemoveClass[i].classList.remove('wrong-answer');
// mudei pra inLineStyle pro CC pra de reclamar
      buttonRemoveClass[i].style.border = '';
    }
    this.setState((prevState) => ({ idx: prevState.idx + 1 }));
  }

  render() {
    const { questions, loading, idx } = this.state;
    return !loading ? (
      <div>
        <Timer />
        {questions
          .filter((_, questionIndex) => questionIndex === idx)
          .map((trivia) => {
            const { category, correct_answer: correctAnswer, question, incorrect_answers } = trivia;
            return (
              <section>
                <p data-testid="question-category">{category}</p>
                <p data-testid="question-text">{question}</p>
                {shuffle(correctAnswer, incorrect_answers).map((answer, index) => {
                  if (answer === correctAnswer) {
                    return buttonRigthAnswer(correctAnswer);
                  }
                  return buttonWrongAwswer(index, answer);
                })}
                {nextButton(() => this.nextQuestion())}
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
