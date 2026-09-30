import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from '../cats.schema';
import { PickType } from '@nestjs/swagger';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'imgUrl',
  'password',
]) {}
