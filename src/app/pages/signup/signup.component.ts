import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({

  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})


export class SignupComponent {

  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  registerUser() {
    this.authService.registerUser(this.username, this.email, this.password).subscribe({

      next: (result) => {
        console.log('[ SUCCESSFUL SIGNUP ]', result);
        alert('[SIGNUP SUCCESSFUL! Please LOGIN]');
        this.router.navigate(['/login']);

      },

      error: (error) => {
        console.error('[ SIGNUP FAILED ]', error.message);
        alert('[SIGNUP FAILED] : ' + error.message);
      }
    });
  }



}
