import { IArea } from "./area";

export interface ICity {
  id: number;
  name: string;
  areas: IArea[];
}
