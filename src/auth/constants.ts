import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConstants {
  constructor(private configService: ConfigService) {}

  get secret(): string | undefined {
    return this.configService.get<string>('JWT_SECRET'); // Access JWT_SECRET from .env
  }
}
