import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  carImages: CarImage[] = [];
  currentCar: Car;

  constructor(private carService:CarService, private activetedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCurrentCarImage(params["carId"])
      }
    })
  }

  getCurrentCarImage(carId:number){
    this.carService.getCurrentCarImages(carId).subscribe(response=>{
      this.carImages = response.data
    })
  }

}
