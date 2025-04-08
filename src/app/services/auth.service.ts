import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({

  providedIn: 'root'

})


export class AuthService {

  constructor( private apollo: Apollo ) { }

    authenticateUser(username: string, password: string){

      const LOGIN_QUERY = gql`

        query Login($username: String!, $password: String!) {
          login(username: $username, password: $password)

      }
      `;

      return this.apollo.query<any>({

        query: LOGIN_QUERY,
        variables: { username, password }

      });

    }

    registerUser(username: string, email: string, password: string){

      const SIGNUP_MUTATION = gql`

        mutation Signup($username: String!, $password: String!){
          signup(username: $username, email: $email, password: $password){
            _id
            username
            email
          }
        }
      `;

      return this.apollo.mutate<any>({

        mutation: SIGNUP_MUTATION,
        variables: { username, email, password }

      });

    }
}
