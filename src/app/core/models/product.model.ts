import { Data } from '@angular/router';
import { CardInfo } from '../interfaces/cardInfo.interface';
import { ICategory } from '../interfaces/category.interface';
import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct, CardInfo {
  id:number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];

  constructor(product: IProduct) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.description = product.description;
    this.category = product.category;

    this.images = product.images;
  }
  getName(): string {
    return this.title;
  }

  isCategory(category?:number):boolean{
    if(category===undefined){
      return true;
    }
    if(this.category?.id === category){
      return true;
    }
    return false;
  }

  getOtherValue(): string {
    return this.description.substring(0, 100) + '...';
  }
  getAvatar(): string | undefined {
    return this.images[0];
  }

  getSearchValue() {
    return this.title.toLowerCase();
  }

  getCategory() {
    return this.category.id;
  }

  getButtonText() {
    return 'Comprar';
  }

  getType(){
    return 'product'
  }
}
