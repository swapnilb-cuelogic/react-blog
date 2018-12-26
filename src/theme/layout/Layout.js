import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Aux from 'react-aux';
import { ToastContainer } from 'react-toastify';
import { withRouter } from 'react-router-dom';

@inject('cmsStore')
@withRouter
@observer
class Layout extends Component {
  render() {
    return (
      <Aux>
        {this.props.children}
        <ToastContainer className="toast-message" />
      </Aux>
    );
  }
}

export default Layout;
