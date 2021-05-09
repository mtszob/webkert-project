import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPermissionComponent } from './add-permission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    AddPermissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatButtonModule,
    MatDialogModule, MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule,
    MatIconModule
  ],
  entryComponents: [AddPermissionComponent],
  exports: [AddPermissionComponent],
  providers: [MatDatepickerModule]
})
export class AddPermissionModule { }
