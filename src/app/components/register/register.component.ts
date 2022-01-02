import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User;
  userRegisterForm:FormGroup

  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createUserAddForm();
  }


  createUserAddForm(){
    this.userRegisterForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  register(){
    if(this.userRegisterForm.valid){
      let userModel = Object.assign({},this.userRegisterForm.value)
      this.authService.register(userModel).subscribe(response=>{
        this.toastrService.success("Register is successiful.")
        let loginModel = Object.assign({}, this.userRegisterForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        //console.log(response.data.accessToken.token)
        this.router.navigate([""])
        this.toastrService.success(response.message)
        localStorage.setItem("token",response.data.accessToken.token)
        localStorage.setItem("name",response.data.user.firstName + " " + response.data.user.lastName)
      },
      responseError=>{
        this.toastrService.error(responseError.error)
      })
      },
      error=>{
        if(error.error.Errors != null){
          for (let i = 0; i < error.error.Errors.length; i++) {
            this.toastrService.error(error.error.Errors[i].message)
          }
        }
        else{
          this.toastrService.error(error.error.message)
        }
      })
    }
    else {
      this.toastrService.error('Required field missing', 'Error');
    }
  }
}
