import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyData } from '../../models/buy-data';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';



@Component({
    selector: 'kit-buy-dialog',
    styleUrls: [ 'buy-dialog.dialog.scss' ],
    templateUrl: 'buy-dialog.dialog.html',
})
export class BuyDialog {
    purchaseGroup = new FormGroup({
        nameControl: new FormControl('', [Validators.minLength(2)]),
        phoneControl: new FormControl('', [Validators.required, Validators.minLength(9)]),
        emailControl: new FormControl('', [Validators.email]),
        paymentControl: new FormControl('card', [Validators.required]),
        deliveryControl: new FormControl('post', [Validators.required]),
        addressControl: new FormControl('', [Validators.required])
    });
    purchaseForm(value: string): AbstractControl | null { return this.purchaseGroup.get(value); }

    constructor(
        public dialogRef: MatDialogRef<BuyDialog>,
        @Inject(MAT_DIALOG_DATA) public data: BuyData) { }

    purchase(): void {
        this.dialogRef.close(true);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
