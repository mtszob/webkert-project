import { AddPermissionComponent } from './../add-permission/add-permission.component';
import { Permission } from './../../shared/models/Permission';
import { PermissionDetailComponent } from '../permission-detail/permission-detail.component';
import { FbBaseService } from './../../services/fb-base.service';

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'user', 'granter', 'startDateTime', 'endDateTime'];
  dataSource = new MatTableDataSource<Permission>();
  expandedElement: Permission | null;
  list$: Observable<Permission[]> | null = null;

  currentRow: Permission = null;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: FbBaseService<Permission>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'user') {
        return item.user.name;
      } else if (property === 'granter') {
        return item.granter.name;
      } else {
        return item[property];
      }
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  get(): void {
    this.list$ = this.service.get('permissions').pipe(
      catchError(err => {
        return throwError(err);
      })
    );

    this.list$.subscribe(permissions => {
      for (let p of permissions) {
        // Not proud of that
        p.date = new Date(p.date['seconds'] * 1000 + p.date['nanoseconds'] / 100000);
        p.startDateTime = new Date(p.startDateTime['seconds'] * 1000 + p.startDateTime['nanoseconds'] / 100000);
        p.endDateTime = new Date(p.endDateTime['seconds'] * 1000 + p.endDateTime['nanoseconds'] / 100000);
      }
      this.dataSource.data = permissions;
    });
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(PermissionDetailComponent, {
      width: '800px',
      height: '600px',
      data: {
        dataKey: data
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddPermissionComponent, {});

    dialogRef.afterClosed().subscribe((permission: Permission) => {
      if (permission !== undefined) {
      this.service.add('permissions', permission, permission.id).then(id => { console.log(id); });
      }
    }, err => {
      console.warn(err);
    });
  }
}
