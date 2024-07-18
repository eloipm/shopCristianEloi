import { ICategory } from "./category.interface";

export interface IProduct {
  title: string;
  price: 0;
  description: string;
  category:ICategory;
  images: string[];
}
