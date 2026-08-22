import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { roleGuard } from './auth/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth/login-or-register/login-or-register').then(c => c.LoginOrRegister)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login-or-register/login-or-register').then(c => c.LoginOrRegister) 
    },
    {
        path: 'books',
        loadComponent: () => import('./books/book-list/book-list').then(c => c.BookList),
        canActivate: [authGuard, roleGuard(['Librarian','Customer'])]
    },
    {
        path: 'book/add',
        loadComponent: () => import('./books/book-add/book-add').then(c => c.BookAdd),
        canActivate: [authGuard, roleGuard(['Librarian'])]
    
    },
    {
        path: 'book/edit/:id',
        loadComponent: () => import('./books/book-add/book-add').then(c => c.BookAdd),
        canActivate: [authGuard, roleGuard(['Librarian'])]
    },
    {
        path: 'book/:id',
        loadComponent: () => import('./books/book-detail/book-detail').then(c => c.BookDetail),
        canActivate: [authGuard, roleGuard(['Librarian','Customer'])]
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart/cart').then(c => c.Cart),
        canActivate: [authGuard, roleGuard(['Customer'])]
    },
    {
        path: 'return-rentals',
        loadComponent: () => import('./return-rentals/return-rentals/return-rentals').then(c => c.ReturnRentals),
        canActivate: [authGuard, roleGuard(['Librarian'])]
    },
    {
        path: 'role-assignment',
        loadComponent: () => import('./auth/role-assignment/role-assignment').then(c => c.RoleAssignment),
        canActivate: [authGuard]
    },
    {
        path: 'unauthorized',
        loadComponent: () => import('./unauthorized/unauthorized').then(c => c.Unauthorized)
    },
    {
        path: '**',
        loadComponent: () => import('./error404/error404').then(c => c.Error404)
    }

];
