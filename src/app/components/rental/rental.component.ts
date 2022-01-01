import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[] = [];
  currentCar:Rental;
  filterText = "";


  constructor(private rentalService:RentalService, private activetedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getRentalsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getRentalsByColor(params["colorId"])
      }
      else{
        this.getRentals();
      }
    })
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals = response.data
    });
  }

  getRentalsByBrand(brandId:number){
    this.rentalService.getRentalsByBrand(brandId).subscribe(response=>{
      this.rentals = response.data
    })
  }

  getRentalsByColor(colorId:number){
    this.rentalService.getRentalsByColor(colorId).subscribe(response=>{
      this.rentals = response.data
    })
  }

  setCurrentCar(rental:Rental){
    this.currentCar=rental;
  }
}
