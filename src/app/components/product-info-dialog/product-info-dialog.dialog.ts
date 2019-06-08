import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';



@Component({
    selector: 'kit-product-info-dialog',
    styleUrls: [ 'product-info-dialog.dialog.scss' ],
    templateUrl: 'product-info-dialog.dialog.html',
})
export class ProductInfoDialog {

    constructor(
        public dialogRef: MatDialogRef<ProductInfoDialog>,
        @Inject(MAT_DIALOG_DATA) public product: Product) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
