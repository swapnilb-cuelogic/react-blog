import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Aux from 'react-aux';
import { ToastContainer } from 'react-toastify';
import { Route, withRouter, Switch } from 'react-router-dom';
import Header from './Header';

@inject('cmsStore')
@withRouter
@observer
class Layout extends Component {
  render() {
    const { location } = this.props;
    return (
      <Aux>
        {this.props.children}
        <ToastContainer className="toast-message" />
      </Aux>
    );
  }
}

export default Layout;
