import { Pipe, PipeTransform } from '@angular/core';
import { Rental } from '../models/rental';

@Pipe({
  name: 'rentalPipe'
})
export class RentalPipePipe implements PipeTransform {

  transform(value: Rental[], filterText: string): Rental[] {
    filterText = filterText? filterText.toLocaleLowerCase():""
    return filterText?value.filter((r:Rental)=>r.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
