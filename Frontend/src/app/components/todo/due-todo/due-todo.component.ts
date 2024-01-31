import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface DialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-due-todo',
  templateUrl: './due-todo.component.html',
  styleUrls: ['./due-todo.component.css']
})
export class DueTodoComponent implements OnInit, OnChanges {
  title!: string;
  description!: string;
  dueTodos: any;
  noDueTodos: any;
  uniqueID: any
  showMoreClicked:boolean[]=[]
  @Input() createdTodo: any;
  @Input() dueTodo:any;
  @Input() due:any;
  @Output() completedTodo = new EventEmitter<any>();
  addCompletedTodo(value: any) {
    this.completedTodo.emit(value);
  }

  constructor(public dialog: MatDialog, private service: TodoService, private _snackBar: MatSnackBar, private router: Router) {

  }

  onEdit(uniqueId: any): void {
    this.uniqueID = uniqueId
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: this.title, description: this.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.service.edit(result.title, result.description, this.uniqueID).subscribe((response: any) => {
        let obj = this.dueTodos.findIndex((item: any) => item.taskID === this.uniqueID)
        this.dueTodos[obj].title = result.title;
        this.dueTodos[obj].description = result.description;
        this.openSnackBar(response.msg, "Close");
      }, err => {
        if (err.status === 400) {
          this.openSnackBar(err.error.msg, "Close");
        }
      })
    });
  }

  onDelete(uniqueId: any) {
    this.uniqueID = uniqueId;
    this.service.delete(this.uniqueID).subscribe((response: any) => {
      this.dueTodos = this.dueTodos.filter((item: any) => item.taskID !== this.uniqueID)
      this.openSnackBar(response.msg, "Close");
    }, err => {
      if (err.status === 400) {
        this.openSnackBar(err.error.msg, "Close");
      }
    })
  }

  onCheck(uniqueId: any) {
    this.uniqueID = uniqueId;
    this.service.done(this.uniqueID).subscribe((response: any) => {
      let todo = this.dueTodos.filter((item: any) => item.taskID === this.uniqueID)
      this.addCompletedTodo(todo);
      this.dueTodos = this.dueTodos.filter((item: any) => item.taskID !== this.uniqueID)
      this.openSnackBar(response.msg, "Close");
    }, err => {
      if (err.status === 400) {
        this.openSnackBar(err.error.msg, "Close");
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1200
    });
  }

  getDueTodos() {
    this.service.todo().subscribe((response: any) => {
      this.dueTodos = response;
    }, err => {
      console.log(err);
    })
  }

  getNoDueTodos() {
    this.service.completed().subscribe((response: any) => {
      this.noDueTodos = response;
    }, err => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.getDueTodos();
    this.getNoDueTodos();
    length=this.dueTodos.length;
    console.log(length);
    for(let index=0;index<length;index++){
      this.showMoreClicked[index]=true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDueTodos();
    this.getNoDueTodos();
  }
  shortDescription(index:any){
    this.showMoreClicked[index]=!this.showMoreClicked[index];
  }
}
