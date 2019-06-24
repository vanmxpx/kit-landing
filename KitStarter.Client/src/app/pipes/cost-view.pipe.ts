import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'costView' })
export class CostViewPipe implements PipeTransform {

    transform(value: number, args?: any): any {
        let result: string = '';
        result = value.toString();
        if (result.length > 3) {
            result = result.slice(0, result.length - 3) + ' ' + result.slice(result.length - 3);
        }
        return result;
    }

}
