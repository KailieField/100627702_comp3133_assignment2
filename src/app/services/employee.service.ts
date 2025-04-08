import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({

    providedIn: 'root'

})

export class EmployeeService {

    constructor( private apollo: Apollo ) {}

    getAllEmployees(): Observable<any> {

        return this.apollo.watchQuery({

            query: gql`
                query {
                    getAllEmployees {
                        _id
                        first_name
                        last_name
                        designation
                        department
                    }
                }
            `
        }).valueChanges;
    }

    getAllEmployeesById(id: string): Observable<any> {

        return this.apollo.watchQuery({

            query: gql`
                query(@eid: ID!) {
                    searchAllEmployeesByEid(eid: $eid) {
                        first_name
                        last_name
                        email
                        designation
                        department
                        salary
                    }
                }
            `,
            variables: { eid: id }
        }).valueChanges;
    }

    addEmployee(employee: any): Observable<any> {
        return this.apollo.mutate({

            mutation: gql`
                mutation AddEmployee(

                    $first_name: String!
                    $last_name: String!
                    $email: String!
                    $designation: String!
                    $department: String!
                    $salary: Float!
                    
                ) {
                    addEmployee(
                        first_name: $first_name
                        last_name: $last_name
                        email: $email
                        designation: $designation
                        department: $department
                        salary: $salary
                    ) {
                        _id    
                    }    
                }
            `, variables: employee
        });
    }
}