import { Component, OnInit } from '@angular/core';
import { AuthguardService } from '../services/authguard.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private auth: AuthguardService) { }

  ngOnInit() {
  }

}