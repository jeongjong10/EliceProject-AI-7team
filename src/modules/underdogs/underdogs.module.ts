import { Module } from '@nestjs/common';
import { UnderdogsController } from './underdogs.controller';
import { UnderdogsService } from './underdogs.service';

@Module({
  controllers: [UnderdogsController],
  providers: [UnderdogsService]
})
export class UnderdogsModule {}
