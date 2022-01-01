import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createBrandsAddForm();
  }

  createBrandsAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (error) => {
          //console.log(error);
          if(error.error.Errors){
            if (error.error.Errors.length > 0)
            for (let i = 0; i < error.error.Errors.length; i++) {
              this.toastrService.error(error.error.Errors[i].ErrorMessage);
            }
          }
          else {
            //console.log(error);
            this.toastrService.error(error.error.message);
          }
        }
      );
    } else {
      this.toastrService.error('Required field missing', 'Error');
    }
  }
}
