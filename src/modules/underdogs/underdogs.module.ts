import { Module } from '@nestjs/common';
import { UnderdogsController } from './underdogs.controller';
import { UnderdogsService } from './underdogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnderDogs } from './entities/underdog.entity';
import { Notice } from './entities/notice.entity';
import { CareCeter } from './entities/carecenter.entity';
import { Breeds } from './entities/breeds.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UnderDogs, Notice, CareCeter, Breeds])],
    controllers: [UnderdogsController],
    providers: [UnderdogsService],
    exports: [UnderdogsModule],
})
export class UnderdogsModule {}
