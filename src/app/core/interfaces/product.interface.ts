import { ICategory } from "./category.interface";

export interface IProduct {
  title: string;
  price: number;
  description: string;
  category:ICategory;
  images: string[];
}
