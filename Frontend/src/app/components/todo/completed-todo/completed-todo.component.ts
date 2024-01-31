import { Component, OnInit, Input, OnChanges, SimpleChanges,Output,EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-completed-todo',
  templateUrl: './completed-todo.component.html',
  styleUrls: ['./completed-todo.component.css']
})
export class CompletedTodoComponent implements OnInit, OnChanges {
  noDueTodos: any
  uniqueID:any
  constructor(private service: TodoService, private _snackBar: MatSnackBar,) { }
  @Input() todo: any;
  @Output() dueTodo= new EventEmitter<any>();
  addDueTodo(value: any) {
    this.dueTodo.emit(value);
  }
  showMoreClicked:boolean[]=[]
  getNoDueTodo() {
    this.service.completed().subscribe((response: any) => {
      this.noDueTodos = response;
    }, err => {
      console.log(err);
    })
  }

  onDue(uniqueId: any) {
    this.uniqueID = uniqueId;
    this.service.due(this.uniqueID).subscribe((response: any) => {
      let due=this.noDueTodos.filter((item: any) => item.taskID === this.uniqueID)
      this.addDueTodo(due);
      this.noDueTodos = this.noDueTodos.filter((item: any) => item.taskID !== this.uniqueID)
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

  ngOnInit(): void {
    this.getNoDueTodo();
    length=this.noDueTodos.length;
    for(let index=0;index<length;index++){
      this.showMoreClicked[index]=true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getNoDueTodo();
  }

  shortDescription(index:any){
    this.showMoreClicked[index]=!this.showMoreClicked[index];
  }
}
