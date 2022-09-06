import { gql } from "@apollo/client";
export const NEW_USER_ADDED_SUBSCRIPTION = gql`
  subscription OnUserAdded($id: id!) {
    userAdded(id: $id) {
      id
      title
    }
  }
`;