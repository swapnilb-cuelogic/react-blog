import gql from 'graphql-tag';

export const createPage = gql`
  mutation CreatePage($title: String!, $slug: String!, $status: String!, $description: String!){
    createPage(title: $title, slug: $slug, status: $status, description: $description) {
      id
      title
      slug
      status
      description
    }
  }
`;

export const updatePage = gql`
  mutation UpdatePage($id: ID!, $title: String!, $slug: String!, $status: String!, $description: String!){
    updatePage(id: $id, title: $title, slug: $slug, status: $status, description: $description) {
      id
      title
      slug
      status
      description
    }
  }
`;

export const getAllPages = gql`
  query allPages($filter: PageFilter) {
    allPages(filter: $filter, orderBy: createdAt_DESC){
      id
      createdAt
      updatedAt
      title
      slug
      status
    }
  }
`;

export const getPage = gql`
  query onePage($id: ID) {
    Page(id: $id) {
      id
      createdAt
      updatedAt
      title
      slug
      description
      status
    }
  }
`;

export const pageContent = gql`
  query allPages($slug: String!) {
    allPages(filter: {slug: $slug}){
      id
      title
      description
    }
  }
`;

export const deletePage = gql`
  mutation deletePage($id:  ID! ) {
    deletePage(id: $id) {
      id
    }
  }
`;
