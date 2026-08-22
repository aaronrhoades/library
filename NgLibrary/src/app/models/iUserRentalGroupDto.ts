import { IBook } from "./iBook";

export interface IUserRentalGroupDto {
    userId: string;
    email: string;
    rentals: IBook[];
}