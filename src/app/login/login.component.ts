import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /*propEmail: FormControl = new FormControl('', [
    Validators.required
  ], [
    this.userService.checkEmail.bind(this.userService)
  ])*/
  propEmail: FormControl = new FormControl('', {
    validators: [Validators.required],
    asyncValidators: [this.userService.checkEmail.bind(this.userService)],
    updateOn: 'blur'
  })
  propPass: FormControl = new FormControl()
  form: FormGroup = this.builder.group({
    email: this.propEmail,
    password: this.propPass
  })

  //@ViewChild('form') myform!: NgForm

  /*ngAfterViewInit() {
    console.log(this.myform)
  }*/

  constructor(
    private auth: AuthService,
    private router: Router,
    private builder: FormBuilder,
    private userService: UserService
  ) { }

  login() {
    this.auth.login(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/')
    })
  }
}
