import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { DbService } from './db.service';

@Module({
  providers: [DbService],
  controllers: [DbController]
})
export class DbModule {}
