import { Permission } from './../../shared/models/Permission';
import { Component, OnInit } from '@angular/core';
import { FbBaseService } from '../../services/fb-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: FbBaseService<Permission>) { }

  ngOnInit(): void {
  }

}
