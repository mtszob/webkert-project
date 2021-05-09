import { AddPermissionModule } from './../add-permission/add-permission.module';
import { PermissionDetailModule } from './../permission-detail/permission-detail.module';
import { DetailsModule } from './../details/details.module';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DetailsModule,
    PermissionDetailModule,
    AddPermissionModule,
    MatToolbarModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
