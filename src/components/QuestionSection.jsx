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

class QuestionSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      questions: [],
      index: 0,
      wrongAnswer: '',
      rightAnswer: '',
      shuffledOrder: [],
    };
  }
  
  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=5')
    .then((response) => response.json())
    .then((obj) => obj.results)
    .then((data) => this.setState({ questions: [...data], loading: false }));
  }
  

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { index, loading } = this.state;
  //   if (index === nextState.index || loading === nextState.loading) {
  //     alert('False')
  //     return false;
  //   } else {
  //     alert('True')
  //     return true;
  //   }
  // }

  nextQuestion() {
    this.setState((prevState) => ({ index: prevState.index + 1, rightAnswer: '', wrongAnswer: '',}))
  }
  
  // https://stackoverflow.com/questions/41978408/changing-style-of-a-button-on-click
  highlightAnswers() {
    this.setState({ rightAnswer: 'right-answer', wrongAnswer: 'wrong-anwser', });
  }

  render() {
    const { questions, loading, index, rightAnswer, wrongAnswer } = this.state;
    return !loading ? (
      <div>
        <Timer />
        {questions[0].question}
        {questions
          .filter((_, questionIndex) => questionIndex === index)
          .map((trivia) => {
          const { category, correct_answer: correctAnswer, question, incorrect_answers } = trivia;
          return (
            <section>
              <p data-testid="question-category">{category}</p>
              <p data-testid="question-text">{question}</p>
              {shuffle(correctAnswer, incorrect_answers).map((answer, index) => {
                if (answer === correctAnswer) {
                  return <button data-testid="correct-answer" className={rightAnswer} onClick={() => this.highlightAnswers()}>{correctAnswer}</button>;
                }
                return <button data-testid={`wrong-answer-${index}`} className={wrongAnswer} onClick={() => this.highlightAnswers()}>{answer}</button>;
              })}
              <button data-testid="btn-next" onClick={() => this.nextQuestion()}>Próxima</button>
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
