import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  brand:Brand = {id:0, name:""};

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getBrand(params["brandId"])
    })
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      name: ["",Validators.required]
    })
  }

  getBrand(brandId:number){
    this.brandService.getBrand(brandId).subscribe(response=>{
      this.brand = response.data;
      this.brandUpdateForm.controls["name"].setValue(this.brand.name)
    });
  }

  update() {
    let brandModel: Brand = Object.assign({id: this.brand.id}, this.brandUpdateForm.value);
    if (this.brandUpdateForm.valid) {
      this.brandService.update(brandModel).subscribe((response) => {
        this.toastrService.success(response.message);
      }, (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i]);
          }
        }
      });
    } else {
      this.toastrService.error("Required field missing","Error");
    }
  }

}
