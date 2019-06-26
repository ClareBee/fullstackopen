import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const course = {
  feedbackTitle: 'Give Feedback',
  statsTitle: 'Statistics'
}
ReactDOM.render(<App course={course} />, document.getElementById('root'));
