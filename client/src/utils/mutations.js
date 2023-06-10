import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($firstName: String, $lastName: String, $email: String, $password: String, $currentPassword: String) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, currentPassword: $currentPassword) {
      _id
      firstName
      lastName
      email
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($password: String) {
    deleteUser(password: $password) {
      message
    }
  }
`