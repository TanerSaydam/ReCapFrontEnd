import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  currentCar: Car;

  constructor(private carService:CarService, private activetedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCurrentCar(params["carId"])
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCars()
      }
    })
  }

  getCurrentCar(carId:number){
    this.carService.getCurrentCar(carId).subscribe(response=>{
      this.cars = response.data
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
    })
  }
}
