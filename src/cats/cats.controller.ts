import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { PositiveIntPipe } from '../common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return { cats: 'all cats' };
  }

  @Get(':id')
  getCatById(@Param('id', ParseIntPipe, PositiveIntPipe) id: number) {
    console.log(typeof id);
    return `cat by id: ${id}`;
  }

  @Post()
  createCat() {}

  @Put(':id')
  updateCat() {}

  @Patch(':id')
  updatePartialCat() {}

  @Delete(':id')
  deleteCat() {}
}
