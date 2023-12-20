import { Injectable, Logger, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userModule: UserModule,
    private readonly jwtService: JwtService,
  ) {}

  async loginIn(username: string, password: string) {
    const users = await this.userModule.getUserAndPassword(username, password);
    if (!users) throw new NotAcceptableException('could not find the user');
    const access_token: string = await this.jwtService.signAsync({
      username: users.username,
      password: users.password,
    });

    return {
      access_token: access_token,
      usecase: users.usecase,
    };
  }
}
