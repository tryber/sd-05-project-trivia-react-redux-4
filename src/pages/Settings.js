import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { categoryActions, difficultyActions, typeActions } from '../actions/settingsActions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: [],
    };
  }

  componentDidMount() {
    fetch('https://opentdb.com/api_category.php')
    .then((results) => results.json())
    .then((data) => this.setState({ allCategories: data.trivia_categories }));
  }

  chooseCategory() {
    const { allCategories } = this.state;
    const { fetchCategories } = this.props;
    return (
      <select onChange={(event) => fetchCategories(event.target.value)}>
        <option hidden disabled selected value> -- select an option -- </option>
        {allCategories.map((option) => <option value={option.id}>{option.name}</option>)}
      </select>
    );
  }

  chooseDifficulty() {
    const { fetchDifficulties } = this.props;
    const difficulties = ['easy', 'medium', 'hard'];
    return (
      <select onChange={(event) => fetchDifficulties(event.target.value)}>
        <option hidden disabled selected value> -- select an option -- </option>
        {difficulties.map((option) => <option value={option}>{option}</option>)}
      </select>
    );
  }

  chooseType() {
    const { fetchType } = this.props;
    return (
      <select onChange={(event) => fetchType(event.target.value)}>
        <option hidden disabled selected value> -- select an option -- </option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True/False</option>
      </select>
    );
  }

  render() {
    return (
      <section>
        <h1 data-testid="settings-title">Settings</h1>
        {this.chooseCategory()}
        {this.chooseDifficulty()}
        {this.chooseType()}
        <Link to="/">
          <button>Voltar</button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.settingsReducer.category,
  difficulty: state.settingsReducer.difficulty,
  type: state.settingsReducer.type,
});

const mapDispatchToProps = {
  fetchCategories: categoryActions,
  fetchDifficulties: difficultyActions,
  fetchType: typeActions,
};

Settings.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  fetchDifficulties: PropTypes.func.isRequired,
  fetchType: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
