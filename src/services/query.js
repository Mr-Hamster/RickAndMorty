import gql from 'graphql-tag';

export const getDetailsCharacterQuery = () =>  gql`
    query Character($id: ID!){
        character(id: $id){
          id,
          name,
          status,
          species,
          type,
          gender,
          location{
            name,
            type,
            dimension
          },
          image,
          created
        }
    }`

export const getCharactersQuery = () => gql`
    query Characters($page: Int!, $gender: String!){
        characters(page: $page, filter: {gender: $gender}){
        results{
            id,
            name,
            image,
            status,
            location{
                name
            }
        }
    }
}`

export const getCharactersBySearch = () => gql`
    query Characters($page: Int!, $filter: String!){
        characters(page: $page, filter: {name: $filter}){
            results{
                id,
                name,
                image,
                status
            }
        }
    }`
