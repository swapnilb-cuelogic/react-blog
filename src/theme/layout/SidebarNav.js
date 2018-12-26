import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import Aux from 'react-aux';

@inject('navStore')
@withRouter
@observer
export class SidebarNav extends Component {
  render() {
    return (
      <Aux>
        <div className="private-logo">Paw Cms</div>
        <Dropdown item text="Manage Pages">
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/app/page-builder">Listing</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/app/page-builder/new">Add new</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/app/page-builder/grapesjs">Grapesjs</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Post">
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/app/posts">All Posts</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/app/posts/new">Add new</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/app/page-builder/grapesjs">Grapesjs</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Aux>
    );
  }
}
