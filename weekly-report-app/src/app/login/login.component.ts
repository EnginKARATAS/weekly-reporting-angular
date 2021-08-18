import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  login(): void{
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(['/all-reports'])

        }
      );
     }
  }
}
