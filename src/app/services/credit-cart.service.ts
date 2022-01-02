import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCart } from '../models/creditCart';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleReponseModel } from '../models/single-response-model.service';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {

  apiUrl = "https://localhost:44356/api/";

  constructor(private httpClient:HttpClient) { }

  sendCreditCartandSave(creditCart:CreditCart):Observable<ListResponseModel<CreditCart>>{
    let newPath = this.apiUrl + "creditcarts/add";
      return this.httpClient.post<ListResponseModel<CreditCart>>(newPath,creditCart);
  }

  sendCreditCartnotSave():Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditcarts/payment";
    return this.httpClient.get<ResponseModel>(newPath);
  }

  getCreditCart(customerId:number):Observable<SingleReponseModel<CreditCart>>{
    let newPath = this.apiUrl + "creditcarts/getbycustomerid?customerId=" + customerId;
    return this.httpClient.get<SingleReponseModel<CreditCart>>(newPath);
  }
}
