import { Service, signal } from '@angular/core';
import { IBook } from '@models/iBook';

@Service()
export class CartService {
    private readonly _cart = signal<IBook[]>([]);
    readonly cart = this._cart.asReadonly();

    addToCart(book: IBook) {
        this._cart.update(value => {
            value.push(book);
            return value;
        });
    }

    removeFromCart(book: IBook) {
        this._cart.update(value => {return value.filter(bk => bk != book)});
    }

    isInCart(book: IBook | null) {
        return this._cart().find(b => b === book);
    }
}
