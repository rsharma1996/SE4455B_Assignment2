import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'
import {MatButtonModule} from '@angular/material/button';

export interface VmConfiguration {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

selected='option2';

  constructor() { }

  ngOnInit() {
  }
  

}
