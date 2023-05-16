import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createuser.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    // 사용자 회원가입
    createUser() {}

    // 사용자 회원탈퇴 (비활성화)
    deleteUser() {}

    // 사용자 로그인시, 회원 정보 조회
    findUser() {}

    // 사용자 정보 수정
    updateUser() {}

    // 로그아웃시 토큰 제거
    deleteToken() {}

    // 사용자 방문 신청 내역 조회
    fineUserAdopts() {}

    // 사용자 방문 신청 취소 요청
    deleteUserAdopts() {}
}
