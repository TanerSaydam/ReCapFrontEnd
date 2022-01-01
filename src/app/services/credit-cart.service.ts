import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCart } from '../models/creditCart';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {

  apiUrl = "https://localhost:44356/api/";

  constructor(private httpClient:HttpClient) { }

  sendCreditCart(creditCart:CreditCart):Observable<ListResponseModel<CreditCart>>{
    let newPath = this.apiUrl + "creditcarts/add";
    return this.httpClient.post<ListResponseModel<CreditCart>>(newPath,creditCart);
  }
}
