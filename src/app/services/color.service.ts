import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleReponseModel } from '../models/single-response-model.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  //apiUrl = "https://localhost:44356/api/";
  apiUrl = "https://webapi.ecnorow.com/api/";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + "colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  add(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/add";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }

  getColor(colorId:number):Observable<SingleReponseModel<Color>>
  {
    let newPath = this.apiUrl + "colors/getbyid?id=" + colorId;
    return this.httpClient.get<SingleReponseModel<Color>>(newPath)
  }

  update(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/update";
    return this.httpClient.post<ResponseModel>(newPath,color)
  }
}
