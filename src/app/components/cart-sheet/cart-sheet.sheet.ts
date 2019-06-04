import { Component } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';
import { CleanCartDialog } from './clean-cart/clean-cart.dialog';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { BuyDialog } from '../buy-dialog/buy-dialog.dialog';



@Component({
    selector: 'kit-cart-sheet',
    styleUrls: ['cart-sheet.sheet.scss'],
    templateUrl: 'cart-sheet.sheet.html',
})
export class CartSheet {
    public data: Cart;
    constructor(
        private bottomSheetRef: MatBottomSheetRef<CartSheet>,
        private cartService: CartService,
        public dialog: MatDialog) {
        this.data = this.cartService.getCart();
    }

    proccedPurchase(): void {
        const dialogRef = this.dialog.open(BuyDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cartService.clearCart();
                this.bottomSheetRef.dismiss();
            }
        });
    }
    deleteProduct(product: Product): void {
        this.cartService.deleteProduct(product);
    }

    closeSheet(): void {
        this.bottomSheetRef.dismiss();
    }

    cleanCart(): void {
        const dialogRef = this.dialog.open(CleanCartDialog, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cartService.clearCart();
                this.bottomSheetRef.dismiss();
            }
        });
    }

    getTotalCost(): number {
        const res = this.data.products.reduce((acc, value) => value.cost * value.quantity + acc, 0);
        return isNaN(res) ? 0 : res;
    }
}
