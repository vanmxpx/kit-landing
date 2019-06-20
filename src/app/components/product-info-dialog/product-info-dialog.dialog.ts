import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';



@Component({
    selector: 'kit-product-info-dialog',
    styleUrls: [ 'product-info-dialog.dialog.scss' ],
    templateUrl: 'product-info-dialog.dialog.html',
})
export class ProductInfoDialog {
    public quantity: number = 1;

    constructor(
        public dialogRef: MatDialogRef<ProductInfoDialog>,
        private cartService: CartService,
        @Inject(MAT_DIALOG_DATA) public product: Product) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    toCart(): void {
        this.cartService.addToCart(this.product, this.quantity);
        this.dialogRef.close();
    }

}
