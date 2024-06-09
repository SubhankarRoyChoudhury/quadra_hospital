import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(value: any[], property: string, order: string = 'asc'): any[] {
    if (!value || !property || !order) {
      return value;
    }

    let sorted = value.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else {
        return 0;
      }
    });

    if (order === 'desc') {
      sorted = sorted.reverse();
    }

    return sorted;
  }
}
