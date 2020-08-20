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
      shuffled: [],
    };
  }

  async componentDidMount() {
    await fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((obj) => obj.results)
      .then((data) => {
        this.setState({
          questions: [...data],
        })
      });
      const { questions } = this.state;
      const shuffled = [...questions];
      for (let index in shuffled) {
        shuffled[index] = shuffle(shuffled[index].correct_answer, shuffled[index].incorrect_answers);
      }
      this.setState({
        shuffled: shuffled,
        loading: false
      }); 
  }

  render() {
    const { questions, loading, index, shuffled } = this.state;
    console.log(shuffled);
    return !loading ? (
      <div>
        <Timer />
        {questions
          .map((trivia) => {
          console.log(trivia);
          const { category, correct_answer: correctAnswer, question, incorrect_answers } = trivia;
          return (
            <section>
              <p data-testid="question-category">{category}</p>
              <p data-testid="question-text">{question}</p>
              {shuffled[0].map((answer, index) => {
                if (answer === correctAnswer) {
                  return <button data-testid="correct-answer">{correctAnswer}</button>;
                }
                return <button data-testid={`wrong-answer-${index}`}>{answer}</button>;
              })}
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
