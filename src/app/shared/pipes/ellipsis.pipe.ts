import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(text: string, num: number): string {

    return (text.length <= num) ? text : `${text.slice(0, num)}...`;
  }
}
