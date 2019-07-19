import { Component, Inject, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyData } from '../../models/buy-data';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';



@Component({
    selector: 'kit-buy-dialog',
    styleUrls: [ 'buy-dialog.dialog.scss' ],
    templateUrl: 'buy-dialog.dialog.html',
})
export class BuyDialog implements OnInit {
    purchaseGroup: FormGroup;
    purchaseData: Cart;
    purchaseForm(value: string): AbstractControl | null { return this.purchaseGroup.get(value); }

    constructor(
        public dialogRef: MatDialogRef<BuyDialog>,
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
    ngOnInit() {

    }

    async purchase() {
        this.purchaseData.credentials.name = this.purchaseForm('nameControl').value;
        this.purchaseData.credentials.phoneNumber = this.purchaseForm('phoneControl').value;
        this.purchaseData.credentials.email = this.purchaseForm('emailControl').value;
        this.purchaseData.paymentMethod = this.purchaseForm('paymentControl').value;
        this.purchaseData.deliveryMethod = this.purchaseForm('deliveryControl').value;
        this.purchaseData.credentials.address = this.purchaseForm('addressControl').value;
        this.purchaseData.comment = this.purchaseForm('commentControl').value;

        let purchaseResult = await this.cartService.purchase();
        if (purchaseResult) {

            this.cartService.clearCart();
            this.dialogRef.close(true);
        } else {
            console.log('Some error on purchase');
        }

    }


    onNoClick(): void {
        this.dialogRef.close();
    }

}
