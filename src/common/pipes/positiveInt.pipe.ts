import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number | string): number {
    const num = Number(value);
    if (num <= 0) {
      throw new HttpException('Value must be a positive integer', 400);
    }
    return num;
  }
}
