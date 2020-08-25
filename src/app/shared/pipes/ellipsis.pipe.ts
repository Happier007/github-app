import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})

/**
 * Made for an example of using a custom pipe
 */
export class EllipsisPipe implements PipeTransform {

  public transform(text: string, num: number): string {

    return (text.length <= num) ? text : `${text.slice(0, num)}...`;
  }
}
