import { CardInfo } from '../interfaces/cardInfo.interface';
import { Iuser } from '../interfaces/user.interface';

export class User implements Iuser, CardInfo {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
  avatar: string;

  constructor(user: Iuser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
    this.avatar = user.avatar;
  }

  getId() {
    return this.id;
  }

  getSearchValue() {
    return this.name.toLowerCase();
  }

  isCategory(category: number): boolean {
    return true;
  }

  getName() {
    return this.name;
  }

  getOtherValue(): string {
    return this.role;
  }

  getAvatar(): string {
    return this.avatar;
  }

  getButtonText() {
    return 'eliminar';
  }

  getType() {
    return 'user';
  }
}
