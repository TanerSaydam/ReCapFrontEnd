import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm: FormGroup;
  user: User;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createUpdateUserForm();
  }

  createUpdateUserForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  getUser(){
    let userId = localStorage.getItem('userId');
    this.authService.getUser(userId).subscribe(response=>{
      console.log(response.data)
      this.user = response.data;
      this.userUpdateForm.controls["firstName"].setValue(this.user.firstName);
      this.userUpdateForm.controls["lastName"].setValue(this.user.lastName);
      this.userUpdateForm.controls["email"].setValue(this.user.email);
    })
  }

  update() {
     this.user.firstName = this.userUpdateForm.controls["firstName"].value;
     this.user.lastName = this.userUpdateForm.controls["lastName"].value;
     this.user.email = this.userUpdateForm.controls["email"].value;

    this.authService.update(this.user).subscribe(response=>{
      this.toastrService.success(response.message);
    })
  }
}
