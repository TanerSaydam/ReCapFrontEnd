import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleReponseModel } from '../models/single-response-model.service';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,
    private storageService: LocalStorageService) { }

  //apiUrl = "https://localhost:44356/api/";
  apiUrl = "https://webapi.ecnorow.com/api/";
  jwtHelper: JwtHelperService = new JwtHelperService;
  claims:string[]

  login(loginModel:LoginModel):Observable<SingleReponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/login";
    return this.httpClient.post<SingleReponseModel<TokenModel>>(newPath,loginModel)
  }

  isAuthenticated(){
    let isExpired = this.jwtHelper.isTokenExpired(this.storageService.getToken());
    return !isExpired;
    // if(localStorage.getItem("token")){
    //   return true;
    // }
    // else{
    //   // let token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6InRhbmVyQHNheWRhbS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVGFuZXIgU2F5ZGFtIiwibmJmIjoxNjQxMjU0OTQwLCJleHAiOjE2NDEyNTU1NDAsImlzcyI6ImVuZ2luQGVuZ2luLmNvbSIsImF1ZCI6ImVuZ2luQGVuZ2luLmNvbSJ9.LOWX2XvEnDx9GmlYhdhPIVDQETd0mVuCJ4WRW793pT0ZLXUFR1siId49KBumo2CxZW6RHvhRC0J6PWgdLr9tuQ";
    //   // let decode = this.jwtHelper.decodeToken(token);
    //   // var propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
    //   // let userName = decode[propUserName];
    //   // console.log(decode)
    //   return false;
    // }
  }

  // setClaims() {

  //   if ((this.claims == undefined || this.claims.length == 0) && this.storageService.getToken() != null && this.loggedIn() ) {

  //     this.httpClient.get<string[]>(environment.getApiUrl + "/OperationClaims/getuserclaimsfromcache").subscribe(data => {
  //       this.claims =data;
  //     })


  //     var token = this.storageService.getToken();
  //     var decode = this.jwtHelper.decodeToken(token);

  //     console.log(decode)
  //     var propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
  //     this.userName = decode[propUserName];
  //   }
  // }


  update(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "auth/update";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  register(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "auth/register";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  getUser(userId:string):Observable<SingleReponseModel<User>>{
    let newPath = this.apiUrl + "auth/getbyid?userId=" + userId;
    return this.httpClient.get<SingleReponseModel<User>>(newPath);
  }

  loggedIn(): boolean {
    let isExpired = this.jwtHelper.isTokenExpired(this.storageService.getToken());
    return !isExpired;
  }

  getCurrentUserId() {
    this.jwtHelper.decodeToken(this.storageService.getToken()).userId;
  }
}
