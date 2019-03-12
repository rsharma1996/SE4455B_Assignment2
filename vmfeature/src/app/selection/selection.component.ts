import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

import {HttpService} from '../../http.service';
import { NgForm } from '@angular/forms';

export interface VMOptions {
  name: string;
  cores: number;
  ram: number;
  storage: string;
  price:Number;
}

const ELEMENT_DATA: VMOptions[] = [];



@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

selected='Large Virtual Server Instance';

  displayedColumns: string[] = ['name', 'cores', 'ram', 'storage', 'price'];
  dataSource = new MatTableDataSource<VMOptions>(ELEMENT_DATA);
  listOfVMs :VMOptions[] = [];

  
  constructor(private http : HttpClient) { }
  user = { name : 'VMSERVER', cores : 4, ram : 4, storage : 256, price : 40};

  ngOnInit() {
    this.getVMS();
  }
  
  getVMS(){
    //make HTTP Get request to backend server and return all of the current VMS
    this.http.get('https://rshar59-virtualbuds-assignment2-rshar59.c9users.io:8081/api/vms').subscribe(data=>{
     console.log(data);
    
     
    // for(var i = 0; i< data.length; i++){
    //   console.log(data[i]);
    // }
     //console.log(data.vms);
    // for(var x in data.vms){
    //   this.listOfVMs.push(x);
    // }
    // var arr = Object.keys(data).map(key => ({type: key, value: data[key]}));
    
    // console.log(arr);
    // for(var x in arr){
    // this.listOfVMs.push(arr[x].value);
    // }
   
     console.log("thisislist of vms");
     console.log(this.listOfVMs);
     //the data is then added to the table
     this.dataSource = new MatTableDataSource<VMOptions>(this.listOfVMs);
   });
  }
  
  createVM(form: any){
    const heads: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post('https://rshar59-virtualbuds-assignment2-rshar59.c9users.io:8081/api/vms',JSON.stringify(this.user),{headers: heads}).subscribe(data =>{
    console.log(data);
  });
  }
}
