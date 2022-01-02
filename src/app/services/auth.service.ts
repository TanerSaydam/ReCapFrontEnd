import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleReponseModel } from '../models/single-response-model.service';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = "https://localhost:44356/api/";

  login(loginModel:LoginModel):Observable<SingleReponseModel<TokenModel>>{
    let newPath = this.apiUrl + "auth/login";
    return this.httpClient.post<SingleReponseModel<TokenModel>>(newPath,loginModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

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
}
