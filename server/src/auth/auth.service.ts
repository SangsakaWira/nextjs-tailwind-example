import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        try{
            const user = await this.usersService.findOneByUsername(username);
        const isMatch = await bcrypt.compare(password, user.password)
        if (user) {
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
        } else {
            return null
        }
        return null;
        }catch(err){
            return {
                codeStatus:500,
                msg:"Something is Wrong!"
            }
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: any) {
      
  }

    async getProfile(id: string) {
        const user = await this.usersService.findOne(id);
        return user;
    }
}
