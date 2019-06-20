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
        return this._cart.products.reduce((total, value) => total + value.quantity, 0);
    }

    deleteProduct(product: Product): void {
        const index = this._cart.products.findIndex(val => product.id === val.id && product.selectedColor === val.selectedColor);
        if (index !== -1) {
            this._cart.products.splice(index, 1);
        }
    }

    public addToCart(product: Product, quantity: number = 1): void {
        const index = this._cart.products.findIndex(val => product.id === val.id && product.selectedColor === val.selectedColor);
        if (index !== -1) {
            this._cart.products[index].quantity += quantity;
        } else {
            const copyProduct = { ...product };
            copyProduct.quantity = quantity;
            this._cart.products.push(copyProduct);
        }
    }
    public clearCart(): void {
        this._cart = new Cart();
    }
}
