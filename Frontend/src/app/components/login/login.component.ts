import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private service: LoginService, private router: Router, private _snackBar: MatSnackBar, private CookieService: CookieService, private app: AppComponent) { }
  ngOnInit(): void {
    if (this.CookieService.check('sessionID')) {
      this.router.navigateByUrl('/todo')
    }
    else {
      this.loginForm = new FormGroup({
        'username': new FormControl(null, [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]) as FormControl,
        'password': new FormControl(null, [Validators.required]) as FormControl,
      })
    }

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1200
    });
  }

  onSubmit() {
    this.service.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((response: any) => {
      this.router.navigateByUrl('/todo');
    }, err => {
      if (err.status === 401) {
        this.openSnackBar(err.error.msg, "Close");
      }
    })
  }
}
