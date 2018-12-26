import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Card, Table, Icon } from 'semantic-ui-react';
import { DateTimeFormat } from '../../../../theme/common/ImportCommon';

@inject('cmsStore')
@observer
export default class AllPages extends Component {
  componentWillMount() {
    this.props.cmsStore.getPages();
  }
  render() {
    const { pages } = this.props.cmsStore;
    return (
      <Card fluid>
        <div className="table-wrapper">
          <Table unstackable singleLine className="investment-details">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Created date</Table.HeaderCell>
                <Table.HeaderCell>Last modified</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {pages.length === 0 ? (
                <Table.Row><Table.Cell textAlign="center" colSpan="5">No page to display.</Table.Cell></Table.Row>
              ) : (
                pages.map(page => (
                  <Table.Row key={page.id}>
                    <Table.Cell><Link to={`/app/page-builder/${page.id}`}>{page.title}</Link></Table.Cell>
                    <Table.Cell className="capitalize">{page.status}</Table.Cell>
                    <Table.Cell><DateTimeFormat datetime={page.createdAt} /></Table.Cell>
                    <Table.Cell><DateTimeFormat datetime={page.updatedAt} /></Table.Cell>
                    <Table.Cell textAlign="right">
                      <Icon onClick={() => this.props.cmsStore.delete(page.id)} name='trash alternate'/>
                    </Table.Cell>
                  </Table.Row>
                ))
              )
              }
            </Table.Body>
          </Table>
        </div>
      </Card>
    );
  }
}
