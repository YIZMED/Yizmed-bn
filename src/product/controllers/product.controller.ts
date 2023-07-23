import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductReqDto } from '../dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @UseGuards(JwtGuard)
  @Post()
  async createProduct(@Body() productDto: ProductReqDto) {
    return await this.productService.create(productDto);
  }
  @Get()
  async Product() {
    return await this.productService.findAll();
  }
  @Get(':id')
  async findProduct(
    @Param('id', ParseIntPipe) Pid: number,
  ) {
    return await this.productService.findOne(Pid);
  }
}
