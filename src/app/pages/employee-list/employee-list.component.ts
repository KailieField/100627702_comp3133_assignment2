import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { gql, Apollo } from 'apollo-angular';



const GET_ALL_EMPLOYEES = gql`

  getAllEmployees {

    _id
    first_name
    last_name
    designation
    department

  }
`;

@Component({

  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']

})


export class EmployeeListComponent {

  employees: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor( private apollo: Apollo ) { }

  ngOnInit(){

    this.apollo.watchQuery<any>({

      query: GET_ALL_EMPLOYEES
    }).valueChanges.subscribe({

      next: (result) => {

        this.employees = result.data.getAllEmployees;
        this.loading = false;

      },

      error: (error) => {
        
        this.error = error.message;
        this.loading = false;

      }
    });
  }

}
