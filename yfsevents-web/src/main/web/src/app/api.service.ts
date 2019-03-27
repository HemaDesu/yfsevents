import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private basicURL:string="/api"

  private urlList=new Map<string, string>();

  constructor(private http:HttpClient) {
    this.initialiseUrlList();
  }

  initialiseUrlList():void{
    this.urlList.set('partnerngo', '/partnerngo');
    this.urlList.set('event','/event');
    this.urlList.set('events','/events');
    this.urlList.set('volunteer-create','/volunteer-create');
    this.urlList.set('collegeregistration','/collegeregistration');
  }
  postData(data:any, type:string): boolean{
    console.log('posting', data);
    this.http.post(this.basicURL+this.urlList.get(type),data).subscribe(response=>{
      console.log('postResponse: ',response);
      return true;
    },
    error=>{return false});
    return false;
  }

  getData(type:string, id?:any, formatted?:boolean){
    let uri : string =this.basicURL+this.urlList.get(type);
    if(id){
      uri = uri + '/' + id;
      if(formatted){
        uri = uri + '/' + 'formatted';
      }
    }
    return this.http.get(uri);
  }

  putData(data:any,id:any,type:string){
    return this.http.put(this.basicURL+this.urlList.get(type)+"/"+id,data).subscribe(response=>{
      console.log('updating:',response);
    });
  }

}
