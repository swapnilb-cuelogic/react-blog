import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Segment, Container, Grid } from 'semantic-ui-react';
import Layout from './theme/layout/Layout';
import Private from './modules/private/index';
import Public from './modules/public/index';
import './assets/semantic/semantic.min.css';
import './App.css';

@inject('cmsStore')
@withRouter
@observer
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/app/*" component={Private} />
          <Route path="/" component={Public} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
