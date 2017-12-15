import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'intToDate'
})
export class IntToDatePipe implements PipeTransform {

  transform(num: number, args?: any): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(new Date(num), 'yy-MM-dd');
  }

}
