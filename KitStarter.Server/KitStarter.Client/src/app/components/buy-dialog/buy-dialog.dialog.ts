import { Component, Inject, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyData } from '../../models/buy-data';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { DeliveryMethod } from 'src/app/models/delivery-method';
import { PaymentMethod } from 'src/app/models/payment-method';
import { DialogResult } from './buy-dialog-result/dialog-result';
import { BuyDialogResult } from './buy-dialog-result/buy-dialog-result.dialog';



@Component({
    selector: 'kit-buy-dialog',
    styleUrls: [ 'buy-dialog.dialog.scss' ],
    templateUrl: 'buy-dialog.dialog.html',
})
export class BuyDialog {
    loading: boolean = false;

    public DeliveryMethod = DeliveryMethod;
    public PaymentMethod = PaymentMethod;
    purchaseGroup: FormGroup;
    purchaseData: Cart;
    purchaseForm(value: string): AbstractControl | null { return this.purchaseGroup.get(value); }

    constructor(
        public dialogRef: MatDialogRef<BuyDialog>,
        public dialog: MatDialog,
        public cartService: CartService) {
            this.purchaseData = this.cartService.getCart();
            this.purchaseGroup = new FormGroup({
                nameControl: new FormControl(this.purchaseData.credentials.name, [Validators.minLength(2)]),
                phoneControl: new FormControl(this.purchaseData.credentials.phoneNumber, [Validators.required, Validators.minLength(9)]),
                emailControl: new FormControl(this.purchaseData.credentials.email, [Validators.email]),
                paymentControl: new FormControl(this.purchaseData.paymentMethod, [Validators.required]),
                deliveryControl: new FormControl(this.purchaseData.deliveryMethod, [Validators.required]),
                addressControl: new FormControl(this.purchaseData.credentials.address, [Validators.required]),
                commentControl: new FormControl(this.purchaseData.comment)
            });
    }

    async purchase() {
        Object.keys(this.purchaseGroup.controls).forEach(key => {
            this.purchaseGroup.get(key).markAsTouched();
        });
        this.purchaseGroup.updateValueAndValidity();
        if (this.purchaseGroup.invalid) {
            return;
        }
        this.loading = true;

        this.purchaseData.credentials.name = this.purchaseForm('nameControl').value;
        this.purchaseData.credentials.phoneNumber = this.purchaseForm('phoneControl').value;
        this.purchaseData.credentials.email = this.purchaseForm('emailControl').value;
        this.purchaseData.paymentMethod = this.purchaseForm('paymentControl').value;
        this.purchaseData.deliveryMethod = this.purchaseForm('deliveryControl').value;
        this.purchaseData.credentials.address = this.purchaseForm('addressControl').value;
        this.purchaseData.comment = this.purchaseForm('commentControl').value;

        try {

            let purchaseResult = await this.cartService.purchase();
            if (purchaseResult) {

                this.cartService.clearCart();
                this.dialog.open(BuyDialogResult, {
                    data: DialogResult.Success,
                });
                this.dialogRef.close(true);
            } else {
                this.dialog.open(BuyDialogResult, {
                    data: DialogResult.Error,
                });
            }
        } finally {
            this.loading = false;
        }


    }


    onNoClick(): void {
        this.dialogRef.close();
    }

}
