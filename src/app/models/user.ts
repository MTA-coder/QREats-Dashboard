import { IRestaurent } from "./restaurent";

export interface IUser {
  id: number;
  name: string;
  is_Admin: boolean;
  type: string;
  restaurent: IRestaurent;
  restaurent_id: number;
  token: string;
}
