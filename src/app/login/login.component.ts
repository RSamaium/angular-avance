import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //@ViewChild('form') myform!: NgForm

  /*ngAfterViewInit() {
    console.log(this.myform)
  }*/

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login(myform: NgForm) {
    this.auth.login(myform.value).subscribe(() => {
      this.router.navigateByUrl('/')
    })
  }
}
