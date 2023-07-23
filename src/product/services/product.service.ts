import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductReqDto } from '../dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(Body: ProductReqDto) {
    try {
      return this.prisma.product.create({
        data: Body,
      });
    } catch (error) {
      return new HttpException(
        `${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findAll() {
    try {
      const result = await this.prisma.product.findMany();
      if (!result) {
        return {
          status: new HttpException(
            { message: 'no product found' },
            HttpStatus.NOT_FOUND,
          ),
        };
      } else {
        return result;
      }
    } catch (error) {
      return new HttpException(
        `${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findOne(productId: number) {
    try {
      const result = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      if (result) {
        return result;
      } else {
        return {
          status: new HttpException(
            { message: 'no product found' },
            HttpStatus.NOT_FOUND,
          ),
        };
      }
    } catch (error) {
      return new HttpException(
        `${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
