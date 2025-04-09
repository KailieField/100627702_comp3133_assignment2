import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root'

})


export class AuthService {

  constructor( private apollo: Apollo ) { }

    authenticateUser(username: string, password: string): Observable<any> {
      return this.apollo.query({

        query: gql`

          query Login($username: String!, $password: String!) {
          login(username: $username, password: $password)

        }
      `,
      variables: {
        username,
        password
      },
      fetchPolicy: 'no-cache'
    });
  }

  registerUser(username: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({

      mutation: gql`
          mutation Signup($username: String!, $email: String!, $password: String!){
          signup(username: $username, email: $email, password: $password){
            _id
            username
            email
          }
        }
      `,
      variables: {
        username,
        email,
        password
      }
    });
  }
}
