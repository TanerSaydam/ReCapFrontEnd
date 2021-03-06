import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand:Brand;
  filterText = "";
  isAuthenticated:boolean;

  constructor(
    private brandService:BrandService,
    private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    });
  }

  setCurrentBrands(brand:Brand){
    this.currentBrand = brand;
  }

  setCurrentBandClass(url:string){
    if(this.router.url === "/" + url){
      return "text-danger"
    }
    else{
      return "text-dark"
    }
  }
}
