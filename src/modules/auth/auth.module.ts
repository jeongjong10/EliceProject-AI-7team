import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature(), UsersModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {
    constructor(private dataSource: DataSource) {}
}
