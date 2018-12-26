import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import AddUpdatePage from '../components/AddUpdatePage';
import TryGrapesjs from '../components/TryGrapesjs';
import AllPages from '../components/AllPages';
import Posts from '../containers/Posts';
import NewPostPage from '../components/NewPostPage'
import ViewPost from '../components/ViewPost'

class PageBuilder extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="content">
        <Switch>
          <Route exact path="/app/page-builder" component={AllPages} />
          <Route exact path="/app/page-builder/grapesjs" component={TryGrapesjs} />
          <Route exact path="/app/page-builder/:id" component={AddUpdatePage} />
          <Route exact path="/app/posts" component={Posts} />
          <Route exact path="/app/posts/:id/edit" component={NewPostPage} />
          <Route exact path="/app/posts/new" component={NewPostPage} />
          <Route exact path="/app/posts/:id/" component={ViewPost} />
        </Switch>
      </div>
    );
  }
}

export default PageBuilder;
