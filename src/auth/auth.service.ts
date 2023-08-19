import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtApiService } from 'src/jwt-api/jwt-api.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtApiService: JwtApiService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new NotFoundException(`No user found with email: ${email}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return { accessToken: this.jwtApiService.sign({ userId: user.id }) };
  }
}
