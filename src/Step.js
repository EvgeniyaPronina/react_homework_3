import React, { PureComponent } from 'react';
import './Step.css';

class Step extends PureComponent {
  handleClick = () => {
    const { number, isClickable, onClick } = this.props;
    if (isClickable) {
      onClick(number);
    }
  };

  render() {
    const { number, isSelected, isClickable, children } = this.props;
    const classNames = ['step'];

    if (isSelected) {
      classNames.push('step-selected');
    }
    if (isClickable) {
      classNames.push('step-clickable');
    }
    //Тег с классом step__title должен содержать текст переданный через children

    return (
      <div className={classNames.join(' ')} onClick={this.handleClick}>
        <h2 className="step__number">{number}</h2>
        <h2 className="step__title">{children}</h2>
      </div>
    );
  }
}

export default Step;
