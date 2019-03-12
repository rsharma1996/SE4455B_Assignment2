import { Injectable } from '@angular/core';
// import { HttpClient, Headers } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
 // private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor() { }
  
  //make http request to server to get all of stored vms
  // getVMS(): Promise<any>{
  //   const url = 'localhost:8081/api/vmroutes';
  //   const heads: Headers = new Headers ({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.get(url,{headers:heads}).toPromise();
  // }
  
}
  //make http get request to server to retrieve all stored vms
  