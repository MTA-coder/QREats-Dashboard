import { Image } from "./image";
import { IType } from "./type";

export interface IProduct {
  id: number;
  name: string;
  description?: string;
  price?: number;
  url?: string;
  type_id: number;
  type?: IType;
  images?: Image[];
}
