import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from 'src/app/services/todo.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
export interface DialogData {
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog, private service: LoginService, private todoService: TodoService, private _snackBar: MatSnackBar, private cookieService: CookieService, private app: AppComponent) { }
  todoForm!: FormGroup;
  completedTodo: any
  todos: any
  username: any;
  dueTodo: any

  addCompletedTodo(value: any) {
    this.completedTodo = value;
  }

  addDueTodo(value: any) {
    this.dueTodo = value;
  }

  ngOnInit(): void {
    if (this.cookieService.check('sessionID')) {
      this.todoForm = new FormGroup({
        'title': new FormControl(null, []) as FormControl,
        'description': new FormControl(null, []) as FormControl,
      })
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  newPassword!: string;
  confirmPassword!: string;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1200
    });
  }

  changePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { newPassword: this.newPassword, confirmPassword: this.confirmPassword },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.updatePassword(result.newPassword).subscribe((response: any) => {
        this.openSnackBar(response.msg, "Close");
      }, err => {
        if (err.status === 401) {
          this.openSnackBar(err.error.msg, "Close");
        }
      })
    });
  }

  logout() {
    this.service.logout().subscribe((response: any) => {
      this.openSnackBar(response.msg, "Close");
      this.router.navigateByUrl('/login');
    }, err => {
      if (err.status === 400) {
        this.openSnackBar(err.error.msg, "Close");
      }
    })
  }

  onSubmit() {
    this.todoService.create(this.todoForm.value.title, this.todoForm.value.description).subscribe((response: any) => {
      this.todos = {
        "title": this.todoForm.value.title,
        "description": this.todoForm.value.description,
      }
      this.openSnackBar(response.msg, "Close");
    }, err => {
      if (err.status === 400) {
        this.openSnackBar(err.error.msg, "Close");
      }
    })
    this.todoForm.reset();
  }

  valid() {
    return !((this.todoForm.value.title && this.todoForm.value.description));
  }
}
