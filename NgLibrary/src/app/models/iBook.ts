import { ICategory } from './iCategory';

export interface IBook {
    id: string;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    categories: ICategory[];
    publishedDate: Date;
    pages: number;
}