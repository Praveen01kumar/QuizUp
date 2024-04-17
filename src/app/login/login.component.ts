import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, spaceNotAllowed } from '../service/validater';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  sub: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.userLoginForm();

  }
  userLoginForm() {
    this.loginForm = this.fb.group({
      usermail: ['', [Validators.required, Validators.email, emailValidator, spaceNotAllowed]],
      password: ['', [Validators.required]],
    });
  }
  get f() { return this.loginForm?.controls }
  onLogin() {
    this.sub = true;
    if (this.loginForm?.invalid) {
      return;
    }
    const payload = { usermail: this.loginForm?.value?.usermail, password: this.loginForm?.value?.password, isAdmin: true, isAttempted: false }
    localStorage.setItem('user_token', JSON.stringify(payload));
    this.router.navigate(['/']);
  }

}
