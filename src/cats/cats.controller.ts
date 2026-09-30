import {
  Body,
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
import { CatsService } from '@/cats/cats.service';
import { HttpExceptionFilter } from '@common/exceptions/http-exception.filter';
import { PositiveIntPipe } from '@common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiResponse({ status: 200, description: '성공', type: ReadOnlyCatDto })
  @ApiResponse({ status: 400, description: 'Bad Request...' })
  @ApiResponse({ status: 500, description: 'Server Error...' })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }
}
