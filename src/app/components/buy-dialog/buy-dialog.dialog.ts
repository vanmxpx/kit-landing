import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyData } from '../../models/buy-data';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
    selector: 'kit-buy-dialog',
    styleUrls: [ 'buy-dialog.dialog.scss' ],
    templateUrl: 'buy-dialog.dialog.html',
})
export class BuyDialog {
    purchaseForm = new FormGroup({
        nameControl: new FormControl('', [Validators.required, Validators.minLength(2)]),
        phoneControl: new FormControl('', [Validators.required, Validators.minLength(9)]),
        paymentControl: new FormControl('', [Validators.required]),
        deliveryControl: new FormControl('', [Validators.required])
    });

    constructor(
        public dialogRef: MatDialogRef<BuyDialog>,
        @Inject(MAT_DIALOG_DATA) public data: BuyData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
