import gql from 'graphql-tag';
export const getAllPosts = gql`
  query {
    allPosts {
      id
      title
    }
  }
`;

export const getPost = gql`
  query onePost($id: ID) {
    Post(id: $id) {
      id
      title
      comments{
        id
        description
      }
    }
  }
`;

export const createPost = gql`
  mutation CreatePost($title: String!){
    createPost(title: $title) {
      title
    }
  }
`;

export const updatePost = gql`
  mutation UpdatePost($id: ID!, $title: String!){
    updatePost(id: $id, title: $title) {
      id
      title
    }
  }
`;

export const deletePost = gql`
  mutation deletePost($id:  ID! ) {
    deletePost(id: $id) {
      id
      title
      comments{
        id
        description
        post {
          id
          title
        }
      }
    }
  }
`;