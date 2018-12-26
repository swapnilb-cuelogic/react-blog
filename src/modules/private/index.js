import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import SidebarLeftOverlay from '../../theme/layout/SidebarLeftOverlay';
import PageBuilder from './Cms/containers/PageBuilder';

@withRouter
export default class Private extends React.Component {
  render() {
    return (
      <SidebarLeftOverlay match={this.props.match}>
        <div className="page-header-section">
          <Grid columns="equal" stackable>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1">Manage Pages</Header> 
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        
        <div className="content-spacer">
          <Switch>
            <Route component={PageBuilder} />
          </Switch>
        </div>
      </SidebarLeftOverlay>
    );
  }
}
