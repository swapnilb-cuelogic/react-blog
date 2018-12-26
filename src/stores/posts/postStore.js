import { observable, action, computed, toJS } from 'mobx';
import Validator from 'validatorjs';
import mapValues from 'lodash/mapValues';
import graphql from 'mobx-apollo';
import Helper from '../../helper/utility';
import { PostGqlClient as client } from '../../api/PostGqlClient';
import { POST_PAGE, COMMENTS_FORM } from '../formMetadata/page';
import {
  getAllPosts, getPost, createPost, updatePost, deletePost
} from '../Queries/Posts';
import {
  createComment
} from '../Queries/Comments';

export class PostStore {
  @observable navMeta = {};
  @observable PBUILDER_FRM = { fields: { ...POST_PAGE }, meta: { isValid: false, error: '' } };
  @observable CBUILDER_FRM = { fields: { ...COMMENTS_FORM }, meta: { isValid: false, error: '' } };
  @observable currentPage = {};

  @action
  getPosts = () => {
    this.navMeta = graphql({
      client,
      query: getAllPosts
    });
    // console.log('returned data',this.navMeta);
  }

  @action
  getOne = (id) => {
    this.currentPage = graphql({
      client,
      query: getPost,
      variables: { id },
      onFetch: (res) => {
        Object.keys(this.PBUILDER_FRM.fields).map(key => {
          this.PBUILDER_FRM.fields[key].value = res.Post[key];
          return null;
        })
      }
    });
  }

  @action
  createComment = (postId) => {
    const data = mapValues(this.CBUILDER_FRM.fields, f => f.value);
    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: createComment,
          variables: {...data, postId},
          refetchQueries: [{ query: getPost, variables: { id: postId } }]
        })
        .then((res) => {         
          resolve()
        })
        .catch((res) => { 
          Helper.toast('Oops something wnt wrong.', 'error')
          reject()
        })
        .finally((data) => {           
          this.reset();
        });
    });
  };
  

  @action
  addUpdatePost = (id) => {
    const data = mapValues(this.PBUILDER_FRM.fields, f => f.value);
    return  new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: id === undefined ? createPost : updatePost,
          variables: {...data, id},
          refetchQueries: [{ query: getAllPosts }]
        })
        .then((res) => {           
          resolve()
        })
        .catch((res) => { 
          Helper.toast('Oops something wnt wrong.', 'error')
          reject()
        })
        .finally((data) => {
          this.reset();
        });
    });


  };

  @action
  eleChange = (e, result) => {
    const type = (e.target) ? e.target.type : '';
    const fieldName = typeof result === 'undefined' ? e.target.name : result.name;
    const fieldValue = typeof result === 'undefined' ? e.target.value : result.value;
    this.onFieldChange('PBUILDER_FRM', fieldName, fieldValue, type);
  };

  @action
  commentTxtChange = (e, result) => {
    const type = (e.target) ? e.target.type : '';
    const fieldName = typeof result === 'undefined' ? e.target.name : result.name;
    const fieldValue = typeof result === 'undefined' ? e.target.value : result.value;
    this.onFieldChange('CBUILDER_FRM', fieldName, fieldValue, type);
  };

  @action
  reset = () => {
    this.PBUILDER_FRM = { fields: { ...POST_PAGE }, meta: { isValid: false, error: '' } };
  }

  @computed get allPosts() {
    return this.navMeta.data.allPosts
  }

  @computed get PostData() {
    if (this.navMeta === 'NO_MATCH') {
      return this.navMeta;
    } else if (this.navMeta.loading) {
      return this.navMeta.loading;
    } else if (this.navMeta.data && this.navMeta.data.allPosts){
      return toJS(this.navMeta.data.allPosts)[0];
    }
    return false;
  }

  @action
  delete = (id) => {
    client
      .mutate({
        mutation: deletePost,
        variables: { id },
        refetchQueries: [{ query: getAllPosts }]
      })
      .then(() =>  Helper.toast('Post deleted successfully.', 'success') )
      .catch((res) => { 
        Helper.toast('Oops something wnt wrong.', 'error')
      })  
  }
  
  @action
  onFieldChange = (currentForm, field, value, type) => {
    const form = currentForm || 'formFinInfo';
    if (field) {
      this[form].fields[field].value = value;
    }
    const validation = new Validator(
      mapValues(this[form].fields, f => f.value),
      mapValues(this[form].fields, f => f.rule),
    );
    this[form].meta.isValid = validation.passes();
    if (field) {
      this[form].fields[field].error = validation.errors.first(field);
    }
  }; 
}

export default new PostStore();
