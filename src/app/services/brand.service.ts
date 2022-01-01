import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleReponseModel } from '../models/single-response-model.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44356/api/";


  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
    }

    add(brand:Brand):Observable<ResponseModel>{
      let newPath = this.apiUrl + "brands/add";
      return this.httpClient.post<ResponseModel>(newPath,brand)
    }

    getBrand(brandId:number):Observable<SingleReponseModel<Brand>>{
      let newPath = this.apiUrl + "brands/getbyid?id=" + brandId
      return this.httpClient.get<SingleReponseModel<Brand>>(newPath);
    }

    update(brand:Brand):Observable<ResponseModel>{
      let newPath = this.apiUrl + "brands/update"
      return this.httpClient.post<ResponseModel>(newPath,brand)
    }

  }
