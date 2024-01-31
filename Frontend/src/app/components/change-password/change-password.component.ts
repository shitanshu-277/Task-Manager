import { Component,Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

export interface DialogData {
  newPassword: string;
  confirmPassword: string;
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  valid() {
    return !((this.data.newPassword && this.data.confirmPassword) && (this.data.newPassword===this.data.confirmPassword));
  }
}
