
import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { NotFound } from '../../../../theme/common/ImportCommon';

@inject('cmsStore')
@observer
class Page extends Component {
  componentWillMount() {
    this.props.cmsStore.getPageContent(this.props.match);
  }
  componentWillReceiveProps(nextProps) {
    this.props.cmsStore.getPageContent(nextProps.match);
  }
  render() {
    const { pageContent } = this.props.cmsStore;
    if(pageContent === 'NO_MATCH') {
      return <NotFound />;
    }
    if (pageContent === true) {
      return 'loading..';
    }
    return (
      <div>
        <h2>{pageContent.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: pageContent.description }} />
      </div>
    );
  }
}

export default Page;
