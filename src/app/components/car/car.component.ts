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

  getImageSource(carImage: CarImage): string {
    let url: string = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F159455643032713178%2F&psig=AOvVaw1o4TooG-RO_Gkxr76qK7jL&ust=1640802128783000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCK7LGOh_UCFQAAAAAdAAAAABAD' ;
    return url;
  }
}
