import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
    transform(value: string, length: number, suffix: string): string {
        if (value.length > length + suffix.length) {
            return value.slice(0, length) + suffix;
        } else {
            return value;
        }
    }
}