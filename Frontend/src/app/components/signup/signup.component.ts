import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private service: LoginService, private router: Router, private _snackBar: MatSnackBar) { }
  signupForm!: FormGroup;
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.email]) as FormControl,
      'newPassword': new FormControl('', [Validators.required]) as FormControl,
      'confirmPassword': new FormControl('', [Validators.required]) as FormControl,
    })
  }

  valid() {
    if (this.signupForm.valid && this.signupForm.touched) {
      if (this.signupForm.get('newPassword') !== null && this.signupForm.get('confirmPassword') !== null) {
        const newPassword = this.signupForm.get('newPassword')?.value;
        const confirmPassword = this.signupForm.get('confirmPassword')?.value;
        return newPassword === confirmPassword;
      }
      else return false;
    }
    else return false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1200
    });
  }

  onSubmit() {
    this.service.signin(this.signupForm.value.username, this.signupForm.value.newPassword).subscribe((response: any) => {
      this.router.navigateByUrl('/todo');
      this.openSnackBar(response.msg, "Close");
    }, err => {
      if (err.status === 401) {
        this.openSnackBar(err.error.msg, "Close");
      }
    })
  }
}
