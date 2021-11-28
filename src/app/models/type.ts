import { IProduct } from "./product";

export interface IType {
  id: number;
  name: string;
  icon: string;
  products?: IProduct[];
}
