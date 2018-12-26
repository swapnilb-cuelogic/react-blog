import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { NotFound } from '../../../../theme/common/ImportCommon';
import { LoadingSpinner } from '../../../../theme/common/ImportCommon';
import Aux from 'react-aux';

@inject('postStore')

@observer
class Posts extends Component{
  componentWillMount() {
    this.props.postStore.getPosts();
  }
  render(){
    const { allPosts, PostData } = this.props.postStore
    if(allPosts === 'NO_MATCH') {
      return <NotFound />;
    }
    else if (PostData === true) {
      return <LoadingSpinner/>
    }
    return (
      <Aux>
        <h2><i>Blog Posts</i></h2>
        <Table sortable celled fixed className="chamunda"> 
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Title
            </Table.HeaderCell>
            <Table.HeaderCell>
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
          <Table.Body>
            {allPosts.length === 0 ? (
              <Table.Row><Table.Cell textAlign="center" colSpan="5">No page to display.</Table.Cell></Table.Row>
                ) : (
            allPosts.map(u => {
              return(
              <Table.Row key={u.id}>
                <Table.Cell>{u.title}</Table.Cell>
                <Table.Cell>
                  <Link to={`/app/posts/${u.id}`}>View</Link> | 
                  <Link to={`/app/posts/${u.id}/edit`}>Edit</Link> | 
                  <Icon onClick={() => this.props.postStore.delete(u.id)} name='trash alternate'/>
                </Table.Cell>
              </Table.Row>
              );
            })
            )}
          </Table.Body>
        </Table>
      </Aux>
    );   
  }
}

export default Posts;