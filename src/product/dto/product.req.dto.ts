import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ProductReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  price: string;
  @IsString()
  @IsNotEmpty()
  image: string;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsString()
  @IsNotEmpty()
  category: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsBoolean()
  @IsNotEmpty()
  availability: boolean;
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
