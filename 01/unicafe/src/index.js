import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const course = {
  title: 'Give Feedback'
}
ReactDOM.render(<App course={course} />, document.getElementById('root'));
