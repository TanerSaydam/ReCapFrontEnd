import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  currentCar: Car;
  filterText = "";

  brandId:number = 0;
  colorId:number = 0;

  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(
    private carService:CarService,
    private colorService:ColorService,
    private brandService:BrandService,
    private activetedRoute:ActivatedRoute) { }

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
      this.getBrands()
      this.getColors()
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

  getCarsWithBrandAndColor(){
    if(this.brandId == 0 && this.colorId ==0){
      this.getCars()
    }
    else if(this.brandId == 0){
      this.getCarsByColor(this.colorId)
    }
    else if(this.colorId == 0){
      this.getCarsByBrand(this.brandId)
    }
    else{
      this.carService.getCarsWithBrandAndColor(this.brandId,this.colorId).subscribe(response=>{
        this.cars = response.data
      })
    }
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    });
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }
}

