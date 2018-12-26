import React from 'react';
import Moment from 'react-moment';

const dateTimeFormat = props => (
  <Moment format="MM/DD/YY">{props.datetime}</Moment>
);

export default dateTimeFormat;
