import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { IBook } from '@models/iBook';
import { Observable, tap } from 'rxjs';

@Service()
export class CartService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;
    private readonly _cart = signal<IBook[]>(this.loadCart());
    readonly cart = this._cart.asReadonly();

    constructor() {
        this._cart.set(this.loadCart());
    }

    addToCart(book: IBook) {
        if (this.isInCart(book)) {
            return;
        }

        const next = [...this._cart(), book];
        this._cart.set(next);
        this.saveCart(next);
    }
    removeFromCart(book: IBook) {
        const next = this._cart().filter(item => item.id !== book.id);
        this._cart.set(next);
        this.saveCart(next);
    }

    clearCart() {
        this._cart.set([]);
        localStorage.removeItem('cart');
    }

    isInCart(book: IBook | null) {
        if (!book) {
            return false;
        }

        return this._cart().some(item => item.id === book.id);
    }

    checkout() : Observable<IBook[]>{
        return this.http.patch<IBook[]>(`${this.apiUrl}/book/rent`, this.cart().map(b => b.id))
        .pipe(
            tap((x) => {
                console.log(x);
                this.clearCart();
            })
        );
    }

    private saveCart(items: IBook[]) {
        localStorage.setItem('cart', JSON.stringify(items));
    }
    
    private loadCart(): IBook[] {
        try {
            const raw = localStorage.getItem('cart');
            return raw ? JSON.parse(raw) as IBook[] : [];
        } catch {
            return [];
        }
    }
}
