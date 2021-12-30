import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { IndexComponent } from './components/index/index.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:IndexComponent},
  {path:"home", pathMatch:"full", component:IndexComponent},
  {path:"brands", component:BrandComponent},
  {path:"cars", component:CarComponent},
  {path:"colors", component:ColorComponent},
  {path:"brand/:brandId", component:BrandComponent},
  {path:"color/:colorId", component:ColorComponent},
  {path:"rentals/brand/:brandId", component:RentalComponent},
  {path:"rentals/color/:colorId", component:RentalComponent},
  {path:"car/:carId",component:CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
