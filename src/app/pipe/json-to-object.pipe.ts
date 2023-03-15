import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonToObject'
})
export class JsonToObjectPipe implements PipeTransform {

  transform(value: string | undefined): number | void {
    if (value) return JSON.parse(value).length;
    else return
  }

}
