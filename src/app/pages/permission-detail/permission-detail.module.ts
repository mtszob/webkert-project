import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PermissionDetailComponent } from './permission-detail.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    PermissionDetailComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [PermissionDetailComponent]
})
export class PermissionDetailModule { }
