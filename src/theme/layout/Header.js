import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon, Container, Menu } from 'semantic-ui-react';

const Header = props => (
  <div className="header-wrap">
    <Menu borderless fixed="top" size="large">
      <Container fluid>
        <Menu.Item as={Link} to="/" header>
          <Icon className="paw big icon" />Paw Cms
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item
                as={NavLink}
                to={`/app/`}
              >
              <span>Admin Panel</span>
            </Menu.Item>
          {
            props.navigation.map(item => (
              <Menu.Item
                key={item.id}
                as={NavLink}
                to={`/${item.slug}`}
              >
                <span>{item.title}</span>
              </Menu.Item>
            ))
          }
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);

export default Header;
