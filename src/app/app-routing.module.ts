import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:RentalComponent},
  {path:"rentals", component:RentalComponent},
  {path:"rentals/brand/:brandId", component:RentalComponent},
  {path:"rentals/color/:colorId", component:RentalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
