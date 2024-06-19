import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: any[], key: string): any[] {
    if (key != '') {
      return products.filter((product) => product?.title.toLowerCase().includes(key.toLowerCase()))
    }
    
    return products;
  }
}
