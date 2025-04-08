import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';





export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'employee/:id', component: EmployeeDetailsComponent },
    
];
