import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded'
})
export class VatAddedPipe implements PipeTransform {

  //value: borunun solundaki değiştirmek istediğimiz değer , pipenin parametreleri(birden çok girilebilir)): dönüş tipi 
  transform(value: number, rate:number): number {
    return value + (value*rate/100)
  }

}
