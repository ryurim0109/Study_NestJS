import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, [
  'email',
  'name',
  'imgUrl',
]) {
  @ApiProperty({
    example: '63c9f0f0f0f0f0f0f0f0f0f0',
    description: '고유 id',
    required: true,
  })
  id: string;
}
