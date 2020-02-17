'use strict';

const e = React.createElement;

class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.front = props.front;
    this.back = props.back;
    this.state = { upward: true };
  }

  render() {
    if (this.state.upward) {
      return e(
        'button',
        { onClick: () => this.setState({ upward: false }) },
        this.front
      );
    } 

    return e(
      'button',
      { onClick: () => this.setState({ upward: true }) },
      this.back 
    );
  }
}

const flashcard = React.createElement(Flashcard, {front: 'GDP', back: '国民生产总值'}, null);
ReactDOM.render(
  flashcard, 
  document.getElementById('flashcard-container')
 );