import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  //* Alternative for using inside schema.prisma onDelete: CASCADE(for the bookmark)
  cleanDB() {
    // PrismaService using the transaction will call the methods bellow in order.
    return this.$transaction([
      this.event.deleteMany(),
      this.user.deleteMany(),
      this.company.deleteMany(),
    ]);
  }
}
