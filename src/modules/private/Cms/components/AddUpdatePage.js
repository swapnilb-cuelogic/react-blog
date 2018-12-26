import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Aux from 'react-aux';
import { Header, Card, Form, Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Helper from '../../../../helper/utility';
import { LoadingSpinner } from '../../../../theme/common/ImportCommon';
import { FormInput, FormDropDown } from '../../../../theme/form/FormElements';

@inject('cmsStore')
@withRouter
@observer
export default class AddUpdatePage extends Component {
  componentWillMount() {
    this.initiateFlow(this.props.match);
  }
  componentWillReceiveProps(nextProps) {
    this.initiateFlow(nextProps.match);
  }

  initiateFlow = (match) => {
    if (match.params.id !== 'new') {
      this.props.cmsStore.getOne(match.params.id);
    } else {
      this.props.cmsStore.reset();
    }
  }
  submit = (e) => {
    e.preventDefault();
    this.props.cmsStore.addUpdatePage(this.props.match.params.id).then(() => {
      Helper.toast('Page created successfully.', 'success');
      this.props.history.push('/app/page-builder');
    });
  }

  updateDescription = (html) => {
    this.props.cmsStore.onFieldChange('PBUILDER_FRM', 'description', html);
  }

  render() {
    const { PBUILDER_FRM, currentPage, eleChange } = this.props.cmsStore;
    const action = this.props.match.params.id === 'new' ? 'new' : 'edit';

    if (currentPage.loading) {
      return <LoadingSpinner />
    }
    return (
      <Aux>
        <Header as="h3">{action === 'new' ? 'Create new page' : 'Edit page'}</Header>
        <Card.Group stackable itemsPerRow={1}>
          <Card fluid>
            <Card.Content>
              <Form onSubmit={this.submit}>
                {
                  ['title', 'slug'].map(field => (
                    <FormInput
                      key={field}
                      type="text"
                      name={field}
                      fielddata={PBUILDER_FRM.fields[field]}
                      changed={eleChange}
                    />
                  ))
                }
                <Form.Field>
                  <label>Page content</label>
                  <ReactQuill
                    theme="snow"
                    onChange={this.updateDescription}
                    name="description"
                    defaultValue={PBUILDER_FRM.fields.description.value}
                  />
                </Form.Field>
                <FormDropDown
                  fielddata={PBUILDER_FRM.fields.status}
                  name="status"
                  defaultValue={PBUILDER_FRM.fields.status.value}
                  containerclassname="dropdown-field"
                  options={[
                    { key: 'draft', value: 'draft', text: 'Draft' },
                    { key: 'published', value: 'published', text: 'Published' },
                  ]}
                  onChange={eleChange}
                />
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
