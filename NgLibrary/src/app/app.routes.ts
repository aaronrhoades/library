import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./books/book-list/book-list').then(c => c.BookList)
    },
    {
        path: 'books',
        loadComponent: () => import('./books/book-list/book-list').then(c => c.BookList)
    },
    {
        path: 'book/add',
        loadComponent: () => import('./books/book-add/book-add').then(c => c.BookAdd)
    },
    {
        path: 'book/:id',
        loadComponent: () => import('./books/book-detail/book-detail').then(c => c.BookDetail)
    }

];
