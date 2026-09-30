import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import type { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class Cat {
  @ApiProperty({
    example: 'sdfsdf@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}
export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: CatDocument) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
