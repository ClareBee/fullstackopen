import React from 'react';
import Part from './Part';

const Content = (props) => {
  return props.content.map((item, index) => {
    return (
      <Part key={index} item={item} />
    )
  });
}

export default Content;
