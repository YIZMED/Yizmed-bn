import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto, signInDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstname: dto.firstname,
          lastname: dto.lastname,
          role: dto.role,
          address: dto.address,
          phone:dto.phone
        },
      });
      return this.createToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: signInDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user)
        throw new ForbiddenException(
          'Credential incorrect',
        );
      const password = await argon.verify(
        user.hash,
        dto.password,
      );
      if (!password)
        throw new ForbiddenException(
          'Credential incorrect',
        );
      return this.createToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }
  async createToken(
    id: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      id,
      email,
    };
    const secret = this.config.get('JWT_SECRETE');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
