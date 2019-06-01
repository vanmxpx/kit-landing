import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { CartSheet } from '../cart-sheet/cart-sheet.sheet';
import { Category } from 'src/app/models/category';

@Component({
    selector: 'product-category',
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

    @Input() category: Category;
    
    constructor( 
        private bottomSheet: MatBottomSheet,
        private cartService: CartService) {
            console.log(this.category);
        }

    ngOnInit() {
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }

    openCart(): void {
        this.bottomSheet.open(CartSheet);
    }
}
