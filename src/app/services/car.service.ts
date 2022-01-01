import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleReponseModel } from '../models/single-response-model.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44356/api/";

  constructor(private httpClient:HttpClient) { }

  getCurrentCar(carId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbyid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarlistbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarlistbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsWithBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarlistwithbrandidandcolorid?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

  getCar(carId:number):Observable<SingleReponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbyid?id=" + carId
    return this.httpClient.get<SingleReponseModel<Car>>(newPath)
  }

  update(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car)
  }

}
