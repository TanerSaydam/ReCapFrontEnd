import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { IndexComponent } from './components/index/index.component';
import { BrandPipe } from './pipes/filter.pipe';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { CarPipePipe } from './pipes/car-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RentalPipePipe } from './pipes/rental-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarImageComponent,
    IndexComponent,
    BrandPipe,
    VatAddedPipe,
    ColorPipePipe,
    CarPipePipe,
    RentalPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
