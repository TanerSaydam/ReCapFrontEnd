import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup
  color:Color = {id:0, name:''};

  constructor(
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.activatedRoute.params.subscribe(params=>{
      this.getColor(params["colorId"]);
    }))
    this.createColorUpdateForm();
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      name: ["",Validators.required]
    })
  }

  getColor(colorId:number){
    this.colorService.getColor(colorId).subscribe(response=>{
      this.color = response.data;
      this.colorUpdateForm.controls["name"].setValue(this.color.name);
    })
  }

  update() {
    let colorModel: Color = Object.assign({id: this.color.id}, this.colorUpdateForm.value);
    if (this.colorUpdateForm.valid) {
      this.colorService.update(colorModel).subscribe((response) => {
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
