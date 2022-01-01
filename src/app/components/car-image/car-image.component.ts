import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CreditCart } from 'src/app/models/creditCart';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CreditCartService } from 'src/app/services/credit-cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
  providers: [DatePipe]
})
export class CarImageComponent implements OnInit {

  carImages: CarImage[] = [];
  currentCar: Car;
  rentDate: Date = new Date();
  returnDate: Date;
  carId:number = 0;
  creditCart: CreditCart = {id:0,customerId:1,fullName:"",cartNumber:"",expirationMounth:0,expirationYear:0,cvv:0};
  rental: Rental;


  constructor(
    private carImageService:CarImageService,
    private activetedRoute:ActivatedRoute,
    private creditCartService:CreditCartService,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCurrentCarImage(params["carId"])
      }
    })
  }

  getCurrentCarImage(carId:number){
    this.carImageService.getCurrentCarImages(carId).subscribe(response=>{
      this.carImages = response.data
    })
  }

  setRental(){
    this.rental = {
      rentDate: this.rentDate,
      carId: this.carImages[0].carId,
      brandId:0,
      brandName: '',
      colorId: 0,
      colorName: '',
      customer: '',
      customerId: 1,
      returnDate: this.returnDate
    }
    console.log(this.rental)
  }

  postRentAndPay(creditCart:CreditCart,rental:Rental){
    this.rentalService.postRental(rental).subscribe(
      response =>{
      console.log(response.success)
      if(response.success){
        this.toastrService.success(response.message)
        this.creditCartService.sendCreditCart(creditCart).subscribe(r=> {
          if(r.success){
            this.toastrService.success("Payment successiful.")
           }
           else{
            this.toastrService.error(r.message)
           }
        }, e=>{
          this.toastrService.error(e.error.message, 'Error!');
        })
      }
      else{
        this.toastrService.error(response.message)
      }
    },
    e=>{
      this.toastrService.error(e.error.message, 'Error!');
    })
  }
}
