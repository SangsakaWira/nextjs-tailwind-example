import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

const saltOrRounds = 10;

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, saltOrRounds)
    const createUser = new this.userModel({
      ...createUserDto,
      password:password
    });
    return createUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({_id:id}).exec();
  }

  async findOneByUsername(username: string) {
    return this.userModel.findOne({username:username}).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({
      _id:id
    },updateUserDto,{
      new:true
    }).exec()
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id:id}).exec();
  }
}
