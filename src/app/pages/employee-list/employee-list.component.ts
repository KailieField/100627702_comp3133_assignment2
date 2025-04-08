import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { gql, Apollo } from 'apollo-angular';

import { EmployeeService } from '../../services/employee.service';



const GET_ALL_EMPLOYEES = gql`

  query {
    getAllEmployees {
      _id
      first_name
      last_name
      designation
      department
      salary
    }
  }
`;

@Component({

  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']

})

export class EmployeeListComponent {

  employees: any[] = [];
  loading: boolean = true;
  error: string = '';

  newEmployee: any = {

    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: 0,
    date_of_joining: new Date().toISOString().slice(0, 10),
    department: '',
    employee_photo: ''


  };

  constructor( private employeeService: EmployeeService ) { }

  ngOnInit() {

    this.employeeService.getAllEmployees().subscribe({
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

  addEmployee() {
    
    this.employeeService.addEmployee(this.newEmployee).subscribe({

      next: (result) => {
        console.log('[ EMPLOYEE ADDED]', result);
        this.ngOnInit(); //<--- this is supposed to re-fetch the employee list but something is misfiring
        this.resetForm(); //<--- Clear form inputs
      },

      error: (error) => {

        console.error('[ERROR: ]', error.message);

      }
    });
  }

  resetForm() {

    this.newEmployee = {

      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      designation: '',
      salary: 0,
      date_of_joining: new Date().toISOString().slice(0, 10),
      department: '',
      employee_photo: ''
      
    };
  }
}



// ------------------------------------------------------ [ DEPRECATED CODE ]------------------------------------------------------
// export class EmployeeListComponent {

//   employees: any[] = [];
//   loading: boolean = true;
//   error: string = '';

//   constructor( private apollo: Apollo ) { }


//   ngOnInit(){

//     this.apollo.watchQuery<any>({

//       query: GET_ALL_EMPLOYEES

//     }).valueChanges.subscribe({

//       next: (result) => {

//         this.employees = result.data.getAllEmployees;
//         this.loading = false;

//       },

//       error: (error) => {
        
//         this.error = error.message;
//         this.loading = false;

//       }
//     });
//   }

// }
