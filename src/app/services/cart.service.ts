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
        let total = 0;
        this._cart.products.forEach((val) => {
          total += val.quantity;
        });
        return total;
    }
    
    deleteProduct(product: Product): void { 
        let index = this._cart.products.findIndex(val => product.id === val.id)
        if (index !== -1) { 
            this._cart.products[index].quantity = 1;
            this._cart.products.splice(index, 1);
        }
    }

    public addToCart(product: Product): void {
        let index = this._cart.products.findIndex(val => product.id === val.id)
        if (index !== -1) { 
            this._cart.products[index].quantity++;
        } else { 
            this._cart.products.push(product);
        }
    }
    public clearCart(): void {
        this._cart = new Cart();
    }
}
