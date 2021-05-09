import { User } from './../../shared/models/User';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mapTo } from 'rxjs/operators';
import { Permission } from 'src/app/shared/models/Permission';


@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isClosing$: Observable<boolean>;
  disableIdForm = false;

  perm: Permission = {
    id: '',
    href: '',
    date: new Date(),
    description: '',
    startDateTime: null,
    endDateTime: null,
    user: {
      id: '',
      name: '',
      href: ''
    },
    granter: {
      id: '',
      name: '',
      href: ''
    },
    privilege: [
      {
        id: '',
        entityType: '',
        function: '',
        action: ''
      }
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<AddPermissionComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      if (data !== undefined && data !== null) {
        this.perm = data.dataKey;
        this.disableIdForm = true;
      }

      this.isClosing$ = this.dialogRef.beforeClosed().pipe(mapTo(true));
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.fb.control({value: this.perm.id, disabled: this.disableIdForm}, Validators.required),
      href: this.fb.control(this.perm.href, Validators.required),
      date: this.fb.control(this.perm.date),
      description: this.fb.control(this.perm.description, Validators.required),
      startDateTime: this.fb.control(this.perm.startDateTime, Validators.required),
      endDateTime: this.fb.control(this.perm.endDateTime, Validators.required),
      user: this.fb.group({
        id: [this.perm.user.id, Validators.required],
        name: [this.perm.user.name, Validators.required],
        href: [this.perm.user.href, Validators.required]
      }),
      granter: this.fb.group({
        id: [this.perm.granter.id, Validators.required],
        name: [this.perm.granter.name, Validators.required],
        href: [this.perm.granter.href, Validators.required]
      }),
      privilege: this.fb.array([])
    });

    for (const priv of this.perm.privilege){
      const privileges = this.form.controls.privilege as FormArray;
      const arraylen = privileges.length;

      const newPrivilegeGroup: FormGroup = this.fb.group({
        id: [priv.id, Validators.required],
        entityType: [priv.entityType, Validators.required],
        function: [priv.function, Validators.required],
        action: [priv.action, Validators.required]
      });

      privileges.insert(arraylen, newPrivilegeGroup);
    }
  }

  ngOnDestroy(): void {
    delete this.fb;
  }

  removeFormControl(i): void {
    const privileges = this.form.controls.privilege as FormArray;

    if (privileges.length < 2) {
      return;
    }
    privileges.removeAt(i);
  }

  addFormControl(): void {
    const privileges = this.form.controls.privilege as FormArray;
    const arraylen = privileges.length;

    if (4 < arraylen) {
      alert('5 privileges max');
      return;
    }

    const newPrivilegeGroup: FormGroup = this.fb.group({
      id: ['', Validators.required],
      entityType: ['', Validators.required],
      function: ['', Validators.required],
      action: ['', Validators.required]
    });

    privileges.insert(arraylen, newPrivilegeGroup);
  }

}
