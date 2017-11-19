import React, { Component } from 'react';
import './App.css';
import Step from './Step';
import PersonalForm from './PersonalForm';
import CardForm from './CardForm';

class App extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    isTimeOver: false
  };

  handleTabClick = number => {
    this.setState({ step: number });
  };

  handleChangeForm = (arg1, arg2) => {
    this.setState({ [arg1]: arg2 });
    console.log(this.state);
  };

  handleClickNextForm = () => {
    this.setState({ step: this.state.step + 1 });
  };

  handleChangeTimeOver = arg => {
    return arg ? this.setState({ isTimeOver: !this.state.isTimeOver }) : null;
  };

  isFormCommitable = () => {
    const commitableSteps = [1, 2];
    const { step, firstName, lastName, email, cardNumber } = this.state;
    if (commitableSteps.indexOf(step) !== -1) {
      if (step === 1) {
        return (
          firstName !== '' &&
          lastName !== '' &&
          email !== '' &&
          email.includes('@')
        );
      }
      if (step === 2) {
        return cardNumber.length === 16;
      }
    } else {
      return false;
    }
  };

  renderForm = () => {
    const { step, firstName, lastName, email, cardNumber } = this.state;
    if (step === 1) {
      return (
        <PersonalForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          onChangeForm={this.handleChangeForm}
        />
      );
    }
    if (step === 2) {
      return (
        <CardForm
          cardNumber={cardNumber}
          onChangeForm={this.handleChangeForm}
          onChangeTimeOver={this.handleChangeTimeOver}
        />
      );
    }
    if (step === 3) {
      return 'Поздравляем!';
    }
  };

  render() {
    const { step } = this.state;
    const stepTitles = ['Personal information', 'Card information', 'Finish'];

    return (
      <div className="container">
        <ul className="tab-panel">
          {stepTitles.map((title, i) => {
            return (
              <li key={title}>
                <span>{i} </span>
                <span>{title}</span>
              </li>
            );
          })}
        </ul>
        <div className="form-content">
          {stepTitles.map((title, i) => {
            return (
              <Step
                key={title}
                onClick={this.handleTabClick}
                isSelected={i + 1 === step}
                number={i + 1}
                isClickable={step > i + 1}
              >
                {title}
              </Step>
            );
          })}

          <form>{this.renderForm()}</form>
        </div>
        <div className="button-panel">
          <button
            className="button button-next"
            disabled={
              !this.isFormCommitable() || this.isTimeOver ? 'disabled' : ''
            }
            onClick={this.handleClickNextForm}
          >
            next
          </button>
        </div>
      </div>
    );
  }
}

export default App;

