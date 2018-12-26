import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Aux from 'react-aux';
import { Header, Card, Form, Button } from 'semantic-ui-react';
import 'react-quill/dist/quill.snow.css';
import Helper from '../../../../helper/utility';
import { LoadingSpinner } from '../../../../theme/common/ImportCommon';
import { FormInput } from '../../../../theme/form/FormElements';

@inject('postStore')
@observer
export default class NewPostPage extends Component {
  componentWillMount() {
    this.initiateFlow(this.props.match);
  }
  componentWillReceiveProps(nextProps) {
    this.initiateFlow(nextProps.match);
  }

  initiateFlow = (match) => {
    if (match.params.id !== 'new') {
      this.props.postStore.getOne(match.params.id);
    } else {
      this.props.postStore.reset();
    }
  }
  submit = (e) => {
    e.preventDefault();
    this.props.postStore.addUpdatePost(this.props.match.params.id).then(() => {
      Helper.toast('Post created successfully.', 'success');
      this.props.history.push('/app/posts');
    });
  }

  updateDescription = (html) => {
    this.props.postStore.onFieldChange('PBUILDER_FRM', 'description', html);
  }

  render() {
    const { PBUILDER_FRM, currentPage, eleChange } = this.props.postStore;
    const action = this.props.match.params.length === 0 ? 'new' : 'edit';

    if (currentPage.loading) {
      return <LoadingSpinner />
    }
    return(
      <Aux>
        <Header as="h3">{action === 'new' ? 'Create new page' : 'Edit page'}</Header>
        <Card.Group stackable itemsPerRow={1}>
          <Card fluid>
            <Card.Content>
              <Form onSubmit={this.submit}>
                {           
                  <FormInput
                    key= 'title'
                    type="text"
                    name= 'title'
                    fielddata={PBUILDER_FRM.fields['title']}
                    changed={eleChange}
                  />
                }
                <div>
                  <Button disabled={!PBUILDER_FRM.meta.isValid} color="green">
                  {action === 'new' ? 'Add' : 'Update'}
                  </Button>
                  <p className="field-error">{PBUILDER_FRM.meta.error}</p>
                </div>
              </Form>
            </Card.Content>
          </Card>
        </Card.Group>
      </Aux>
    );
  }
}
