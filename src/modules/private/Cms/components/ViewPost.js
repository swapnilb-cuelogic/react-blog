import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { LoadingSpinner } from '../../../../theme/common/ImportCommon';
import Helper from '../../../../helper/utility';
import Aux from 'react-aux';
import { FormInput } from '../../../../theme/form/FormElements';

@inject('postStore')
@withRouter
@observer
export default class ViewPost extends Component{
    
    componentWillMount() {
      this.props.postStore.getOne(this.props.match.params.id);
    }

    postComment = (e) => {
      e.preventDefault();
      this.props.postStore.createComment(this.props.match.params.id).then(() => {
        Helper.toast('Comment created successfully.', 'success');
        this.props.postStore.getOne(this.props.match.params.id);
      });
    }
    render(){
    const { currentPage, CBUILDER_FRM, commentTxtChange } = this.props.postStore
      if (currentPage.loading) {
        return <LoadingSpinner />
      }
      const comments = currentPage.data.Post.comments
      return(
        <Aux>
          <p>{currentPage.data.Post.title}</p>
          <Comment.Group >
            <Header as='h3' dividing>
              Comments
            </Header>
          { comments.map(c => {
            return(
              <Comment key={c.id}>
                <Comment.Content>
                  <Comment.Text>{c.description}</Comment.Text>
                </Comment.Content>
              </Comment>
            )
          })}
          <Form reply onSubmit={this.postComment}>
            <FormInput
                key= 'description'
                type="text"
                name= 'description'
                fielddata={CBUILDER_FRM.fields['description']}
                changed={commentTxtChange}
              />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
          </Comment.Group>     
        </Aux>
      );
    }
 }
