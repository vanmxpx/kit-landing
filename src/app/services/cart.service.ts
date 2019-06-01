import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private _cart: Cart;
    constructor() { 
        this._cart = new Cart();
    }

    public getCart(): Cart {
        return this._cart;
    }

    public getProductsCount(): number {
        return this._cart.products.length;
    }

    public addToCart(product: Product): void {
        this._cart.products.push(product);
    }
    public clearCart(): void {
        this._cart = new Cart();
    }
}
