import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({

  selector: 'app-login',
  imports: [], //<----- ** will have to add imports 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})


export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor( private authService: AuthService) {}

    onLogin() {
      this.authService.authenticateUser(this.username, this.password).subscribe({

        next: (result) => {
          console.log('[ USER LOGGED IN ]', result);

          //---- saving token to local storage: 
          const token = result.data.login;
          localStorage.setItem('token', token);

          //**** mental note: nav to go here

        },

        error: (error) => {
          console.error('[FAILED TO LOGIN]', error.message);
        }
      });
    }
}
