import { Service, signal } from '@angular/core';
import { IBook } from '@models/iBook';

@Service()
export class CartService {
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
