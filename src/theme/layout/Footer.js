import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Divider, Grid, Header, Segment,
} from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted vertical className="footer">
    <Container textAlign="center">&copy; 2018 Paw Cms</Container>
  </Segment>
);

export default Footer;
