import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { CartSheet } from '../cart-sheet/cart-sheet.sheet';
import { Category } from 'src/app/models/category';
import { ProductInfoDialog } from '../product-info-dialog/product-info-dialog.dialog';

@Component({
    selector: 'kit-product-category',
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

    @Input() category: Category;

    constructor(
        private dialog: MatDialog,
        private bottomSheet: MatBottomSheet,
        private cartService: CartService) {

    }
    ngOnInit() {
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }

    openCart(): void {
        this.bottomSheet.open(CartSheet);
    }

    openProductInfo(product: Product) { 
        const dialogRef = this.dialog.open(ProductInfoDialog, {
            data: product,
            width: '100vw',
            maxWidth: '100vw'
        });
    }
}
