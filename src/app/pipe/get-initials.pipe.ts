import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getInitials'
})
export class GetInitialsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    return value.slice(0, 1);
  }

}
