import { Component, Inject } from '@angular/core'; 
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';
import { CleanCartDialog } from './clean-cart/clean-cart.dialog';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';



@Component({
    selector: 'cart-sheet',
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
}
