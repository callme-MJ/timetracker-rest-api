import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserRole } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(email: string, name: string, password: string, role: UserRole = UserRole.EMPLOYEE) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS ?? 10));
    const user = new this.userModel({ email, name, passwordHash, role });
    return await user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async listEmployees() {
    console.log("heree");
    
    return this.userModel.find({}).select('-passwordHash').exec();
  }

  async resetPassword(userId: string, newPassword: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) return { ok: false };
    user.passwordHash = await bcrypt.hash(newPassword, Number(process.env.BCRYPT_SALT_ROUNDS ?? 10));
    await user.save();
    return { ok: true };
  }

  async deleteUser(userId: string) {
    const res = await this.userModel.findByIdAndDelete(userId).exec();
    return { ok: Boolean(res) };
  }
}
