import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44356/api/";

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + "rentals/getlistrentaldetail"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  getRentalsByBrand(brandId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getbybrand?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  getRentalsByColor(colorId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getbycolor?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  getCarDetails(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "cars/getbyid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }
}
