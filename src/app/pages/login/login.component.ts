import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({

  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], //<----- ** will have to add imports 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] //<--- *** may need to encapsulate in []

})


export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor( private authService: AuthService, private router: Router) {}

    onLogin() {
      this.authService.authenticateUser(this.username, this.password).subscribe({

        next: (result) => {
          console.log('[ USER LOGGED IN ]', result);

          //---- saving token to local storage: 
          const token = result.data.login;
          localStorage.setItem('token', token);

          //---- Redirect -- route to Employees
          alert('LOGGED IN ✔');
          this.router.navigate(['/employees']);
        },

        error: (error) => {
          console.error('[FAILED TO LOGIN]', error.message);
        }
      });
    }
}
