import React, { Component } from 'react';
import Timer from './Timer';

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
    };
  }

  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((obj) => obj.results)
      .then((data) => this.setState({ questions: [...data], loading: false }));
  }

  updateIndex() {
    this.setState((prevState) => ({ index: prevState.index + 1 }))
  }

  render() {
    const { questions, loading, index } = this.state;
    return !loading ? (
      <div>
        <Timer />
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
                  return <button data-testid="correct-answer">{correctAnswer}</button>;
                }
                return <button data-testid={`wrong-answer-${index}`}>{answer}</button>;
              })}
              <button data-testid="btn-next" onClick={() => this.updateIndex()}>Próxima</button>
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

// Após a resposta ser dada, o botão "Próxima" deve aparecer

// O botão "Próxima" deve possuir o atributo data-testid com o valor btn-next
// Ao clicar nesse botão, a próxima pergunta deve aparecer na tela