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
  status:String;
  t1:Number;
  t2:Number;
}

const ELEMENT_DATA: VMOptions[] = [];



@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

selected='Large Virtual Server Instance';
totalCost =0;

  displayedColumns: string[] = ['delete', 'name', 'cores', 'ram', 'storage', 'price','cost','play','stop','status'];
  dataSource = new MatTableDataSource<VMOptions>(ELEMENT_DATA);
  listOfVMs :VMOptions[] = [];
  time = 0;

  
  constructor(private http : HttpClient) { }
  user = { name : 'VMSERVER', cores : 4, ram : 4, storage : 256, price : 40};

  ngOnInit() {
    this.getVMS();
  }
  
  getVMS(){
    //make HTTP Get request to backend server and return all of the current VMS
    this.http.get('https://rshar59-virtualbuds-assignment2-rshar59.c9users.io:8081/api/vms').subscribe(data=>{
    var myArr: any = data;
     
    for(var i = 0; i< myArr.length; i++){
      if(myArr[i].vm_name != undefined){
        this.listOfVMs.push(myArr[i]);
      }
    }
   
     this.dataSource = new MatTableDataSource<VMOptions>(this.listOfVMs);
   });
  }
  
  startVM(x){
    if(x.vm_Status == "Inactive"){
      x.vm_Status = "Active";
    var d = new Date();
    x.t1 = d.getTime();
    //could change to make request to backend to change t1 if have time
    }
  }
  stopVM(x){
    console.log(x);
    if(x.vm_Status == "Active"){
      x.vm_Status = "Inactive"
      var d = new Date();
      x.t2 = d.getTime();
      console.log(x.t2-x.t1);
      var tdiff = (x.t2-x.t1)/60000;
      //gets tdiff in minutes
     
      x.vm_Cost +=  x.vm_Price*tdiff;
      this.totalCost += x.vm_Price*tdiff;
  
    }
  }
  deleteVM(x){
    var id = x._id;
    const url = `https://rshar59-virtualbuds-assignment2-rshar59.c9users.io:8081/api/vms/${id}`;
    this.http.delete(url).subscribe(data=>{
      console.log(data);
    });
  }
  
  addVM(x){
    this.listOfVMs = [];
    console.log(x);
    const heads: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    if(x=="Large Virtual Server Instance"){
      this.http.post('https://rshar59-virtualbuds-assignment2-rshar59.c9users.io:8081/api/vms',JSON.stringify({vm_name: "Large VSI", vm_cores: 32, vm_RAM: 64, vm_Storage: 20, vm_Price:.10, vm_Cost: 0,vm_Status: "Inactive" }),{headers: heads}).subscribe(data =>{
    console.log(data);
  });
    }
    else if(x =="Ultra-Large Virtual Server Instance"){
      this.http.post('https://rshar59-virtualbuds-assignment2-rshar59.c9users.io:8081/api/vms',JSON.stringify({vm_name: "Ultra-Large VSI", vm_cores: 128, vm_RAM: 512, vm_Storage: 40, vm_Price:.15, vm_Cost: 0, vm_Status: "Inactive" }),{headers: heads}).subscribe(data =>{
    console.log(data);
  });
    }
    else{
      this.http.post('https://rshar59-virtualbuds-assignment2-rshar59.c9users.io:8081/api/vms',JSON.stringify({vm_name: "Basic VSI", vm_cores: 8, vm_RAM: 16, vm_Storage: 20, vm_Price:.05, vm_Cost: 0, vm_Status: "Inactive" }),{headers: heads}).subscribe(data =>{
    console.log(data);
  });
    }
    this.getVMS();
  }
}
