import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

import { Router } from '@angular/router';


const GET_EMPLOYEE_BY_ID = gql`

  query($eid: ID!){

    searchEmployeeByEid(eid: $eid){

      first_name
      last_name
      email
      designation
      department
      salary

    }
  }
`;


@Component({

  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']

})


export class EmployeeDetailsComponent {

  employee:  any;
  loading =  true;
  error =  '';

  constructor( 
    private route: ActivatedRoute, 
    private apollo: Apollo ,
    private router: Router

  ) { }

  goBack(){
    this.router.navigate(['/employees']);
  }

    ngOnInit(){

      const id = this.route.snapshot.paramMap.get('id');

      if(id) {

        this.apollo.watchQuery<any>({

          query: GET_EMPLOYEE_BY_ID,
          variables: { eid: id }

        }).valueChanges.subscribe({

          next: (result) => {

            this.employee = result.data.searchEmployeeByEid;
            this.loading = false;

          },

          error: (error) => {

            this.error = error.message;
            this.loading = false;

          }
        });
      }
    }
    
}

