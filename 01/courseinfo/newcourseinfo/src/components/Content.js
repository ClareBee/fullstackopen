import React from 'react';
import Part from './Part';

const Content = ({ parts }) => parts.map((item, index) => <Part key={index} item={item} />);

export default Content;
