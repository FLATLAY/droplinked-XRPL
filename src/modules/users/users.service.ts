import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersRepo: Model<UserDocument>,
  ) {}

  async createUser(query: Partial<User>) {
    return this.usersRepo.create(query);
  }

  async getUser(filter: FilterQuery<UserDocument>) {
    return this.usersRepo.findOne(filter);
  }

  async updateUser(
    filter: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
  ) {
    return this.usersRepo.findOneAndUpdate(filter, update, { new: true });
  }
}
