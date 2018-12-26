import gql from 'graphql-tag';

export const createComment = gql`
  mutation createComment($description: String!, $postId: ID) {
    createComment(description: $description, postId: $postId){
      id
      description
      post {
        id
        title
      }
    }
  }
`;