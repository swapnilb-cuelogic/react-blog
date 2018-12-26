import React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Segment, Container, Grid } from 'semantic-ui-react';
import { LoadingSpinner, NotFound } from '../../theme/common/ImportCommon';
import Header from '../../theme/layout/Header';
import Footer from '../../theme/layout/Footer';
import Page from '../private/Cms/containers/Page';

@inject('cmsStore')
@withRouter
@observer
export default class Public extends React.Component {
  componentWillMount() {
    this.props.cmsStore.getPageMetaData('published');
  }
  render() {
    const { pages, loading } = this.props.cmsStore;

    const cmsPages = pages ? pages.map(n => n.slug) : [];
    if (loading) {
      return <LoadingSpinner />
    }
    return (
      <div>
        <Header navigation={pages} />
          <Segment vertical className="content">
            <Container>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <Switch>
                      <Route path={`/:slug(${cmsPages.join('|')})`} component={Page} />
                      <Route exact path="/" component={Page} />
                      <Route component={NotFound} />
                    </Switch>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        <Footer />
      </div>
    );
  }
}
