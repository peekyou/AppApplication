import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '../core/services/configuration.service';

@Pipe({
  name: 'localeDate'
})
export class LocaleDatePipe implements PipeTransform {
    constructor(private conf: ConfigurationService) {
    
    }

    transform(value: string): string {
        var date = new Date(Date.parse(value));
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + ' ' + this.conf.getMonthLocale(monthIndex) + ' ' + year;
  }
}