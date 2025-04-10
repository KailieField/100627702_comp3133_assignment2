import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

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

  editingEmployee: string | null = null;
  editForm: any = { };

  constructor( private employeeService: EmployeeService, private authService: AuthService, private router: Router) { }

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

  showAddEmployeeForm: boolean = false;

  toggleAddEmployeeForm() {

    this.showAddEmployeeForm= !this.showAddEmployeeForm;

  }

  addEmployee() {

    if(!this.newEmployee.salary || this.newEmployee.salary < 1000) {

      alert('Salary must be greater than 1000...\n Kinda seems like a robbery to not...');
      return;

    }
    
    this.employeeService.addEmployee(this.newEmployee).subscribe({

      next: (result) => {
        console.log('[ EMPLOYEE ADDED]', result);

        this.ngOnInit(); //<--- this is supposed to re-fetch the employee list but something is misfiring

        this.resetForm(); //<--- Clear form inputs
        alert('EMPLOYEE ADDED ✔');
      },

      error: (error) => {

        console.error('[ERROR: ]', error.message);
        alert('Error: ' +  error.message);

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

  deleteEmployee(id: string) {
    if(!confirm('Delete Employee?')){
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: (result) => {
        console.log('[EMPLOYEE DELETED]', result);
        this.ngOnInit();
        alert('Employee DELETED ✔');
      },

      error: (error) => {

        console.error('[ERROR DELETING EMPLOYEE]', error.message);
        alert('Error: ' + error.message);
      }
    });
  }


  editEmployee(employee: any) {

    this.editingEmployee = employee._id;

    this.editForm = { 

      first_name: employee.first_name,
      last_name: employee.last_name,
      designation: employee.designation,
      department: employee.department,
      salary: employee.salary
      
    };

  }

updateEmployee() {

  if (!this.editingEmployee) {
    console.error('Select Employee to edit first.');
    return;
  }
  
  this.employeeService.updateEmployee(this.editingEmployee, this.editForm).subscribe({

    next: (result)=> {

      console.log('[EMPLOYEE UPDATED]', result);

      this.ngOnInit();

      this.editingEmployee = null;
      this.editForm = { };
      alert('Employee Updated ✔️ >> Refresh Page!');
    },

    error: (error) => {
      console.error('[ERROR UPDATING EMPLOYEE]', error.message);
      alert('ERROR: ' + error.message);
    }
  });
}


  cancelEdit(){

    this.editingEmployee = null;
  }

  viewEmployee(id: string) {
    
    this.router.navigate(['/employee', id]);
  }

  logout() {

    this.authService.logout();
    alert('[LOGGED OUT ✔️]');
    this.router.navigate(['/login']);
  }

  refreshPage() {
    window.location.reload();
  }
}

