import { ICategory } from './iCategory';

export interface IBook {
    id: string;
    title: string;
    imageUrl: string;
    author: string;
    isbn: string;
    publisher: string;
    categories: ICategory[];
    publishedDate: Date;
    dueDate?: Date;
    pages: number;
    userId?: string | null;
    isAvailable?: boolean;
}