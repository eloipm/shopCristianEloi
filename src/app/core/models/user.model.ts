import { CardInfo } from "../interfaces/cardInfo.interface";
import { Iuser } from "../interfaces/user.interface";

export class User implements Iuser, CardInfo{
    email: string;
    name: string;
    password: string;
    role: string;
    avatar: string;

    constructor(user:Iuser){
        this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.role = user.role;
    this.avatar = user.avatar;
    }
   
  
    getSearchValue(){
        return this.name;
    }

    getName(){
        return this.name;
    }

    getOtherValue(): string {
       return this.role;
    }

    getAvatar(): string {
      return this.avatar;
    }

    getButtonText(){
        return "eliminar";
    }


}