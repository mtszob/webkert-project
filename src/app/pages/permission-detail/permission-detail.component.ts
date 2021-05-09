import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FbBaseService } from 'src/app/services/fb-base.service';
import { Permission } from 'src/app/shared/models/Permission';
import { AddPermissionComponent } from '../add-permission/add-permission.component';


@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss']
})
export class PermissionDetailComponent implements OnInit {
  idString: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: FbBaseService<Permission>,
    public dialogRef: MatDialogRef<PermissionDetailComponent>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.service.delete('permissions', this.data.dataKey.id)
    .then(value => console.log(`permission with id ${value} deleted`))
    .catch(err => console.log(err));
  }

  openUpdateDialog(data): void {
    const dialogRef = this.dialog.open(AddPermissionComponent, {data: {dataKey: data}});

    dialogRef.afterClosed().subscribe((permission: Permission) => {
      if (permission !== undefined) {
        this.service.update('permissions', this.data.dataKey.id, permission)
          .then(id => console.log(`permission with id ${this.data.dataKey.id} updated`));
      }
    }, err => {
      console.warn(err);
    });
  }

}
