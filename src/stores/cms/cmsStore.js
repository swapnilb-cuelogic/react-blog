import { observable, action, computed, toJS } from 'mobx';
import Validator from 'validatorjs';
import mapValues from 'lodash/mapValues';
import graphql from 'mobx-apollo';
import Helper from '../../helper/utility';
import { GqlClient as client } from '../../api/GqlClient';
import { CMS_PAGE } from '../formMetadata/page';
import {
  createPage, getAllPages, pageContent, deletePage, getPage, updatePage,
} from '../Queries/Pages';

export class CmsStore {
  @observable PBUILDER_FRM = { fields: { ...CMS_PAGE }, meta: { isValid: false, error: '' } };
  @observable navMeta = {};
  @observable currentPage = {};

  @action
  getPageMetaData = (status) => {
    const filter = status ? { status } : {};
    this.navMeta = graphql({
      client,
      query: getAllPages,
      variables: { filter },
    });
   
  }

  @action
  getPages = () => {
    this.navMeta = graphql({
      client,
      query: getAllPages,
    });
    console.log('returned data',this.navMeta);
  }

  @action
  getOne = (id) => {
    this.currentPage = graphql({
      client,
      query: getPage,
      variables: { id },
      onFetch: (res) => {
        Object.keys(this.PBUILDER_FRM.fields).map(key => {
          this.PBUILDER_FRM.fields[key].value = res.Page[key];
        })
      }
    });
  }

  @action
  getPageContent = (match) => {
    const metadata = {
      slug: match.params.slug || 'index',
      isExact: match.isExact,
    }

    if (metadata.isExact) {
      this.currentPage = graphql({
        client,
        query: pageContent,
        variables: { slug: metadata.slug },
      });
    } else {
      this.currentPage = 'NO_MATCH';
    }
  }

  @computed get pageContent() {
    if (this.currentPage === 'NO_MATCH') {
      return this.currentPage;
    } else if (this.currentPage.loading) {
      return this.currentPage.loading;
    } else if (this.currentPage.data && this.currentPage.data.allPages){
      return toJS(this.currentPage.data.allPages)[0];
    }
    return false;
  }

  @computed get perror() {
    return this.currentPage.error;
  }

  @computed get pages() {
    return (this.navMeta.data && this.navMeta.data.allPages &&
      toJS(this.navMeta.data.allPages)) || [];
  }

  @computed get loading() {
    return this.navMeta.loading;
  }

  @action
  eleChange = (e, result) => {
    const type = (e.target) ? e.target.type : '';
    const fieldName = typeof result === 'undefined' ? e.target.name : result.name;
    const fieldValue = typeof result === 'undefined' ? e.target.value : result.value;
    this.onFieldChange('PBUILDER_FRM', fieldName, fieldValue, type);
  };

  @action
  addUpdatePage = (id) => {
    const data = mapValues(this.PBUILDER_FRM.fields, f => f.value);
    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: id === 'new' ? createPage : updatePage,
          variables: {...data, id},
          refetchQueries: [{ query: getAllPages }],
        })
        .then(() => resolve())
        .catch(() => reject())
        .finally(() => {
          this.reset();
        });
    });
  };

  @action
  delete = (id) => {
    client
      .mutate({
        mutation: deletePage,
        variables: { id },
        refetchQueries: [{ query: getAllPages }]
      })
      .then(() => Helper.toast('Page deleted successfully.', 'success'))
      .catch(error => console.error(error.message));
  };

  @action
  reset = () => {
    this.PBUILDER_FRM = { fields: { ...CMS_PAGE }, meta: { isValid: false, error: '' } };
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

export default new CmsStore;
