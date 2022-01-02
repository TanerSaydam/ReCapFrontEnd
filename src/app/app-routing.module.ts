import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:IndexComponent},
  {path:"home", pathMatch:"full", component:IndexComponent},
  {path:"brands", component:BrandComponent},
  {path:"cars", component:CarComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"user", component:UserUpdateComponent},
  {path:"colors", component:ColorComponent},
  {path:"brand/:brandId", component:BrandComponent},
  {path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"brands/brand/:brandId", component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"color/:colorId", component:ColorComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"colors/color/:colorId", component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"rentals", component:RentalComponent},
  {path:"car/:carId",component:CarComponent},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/car/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"carimages/carimages/:carId",component:CarImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
