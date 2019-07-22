import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogResult } from '../../buy-dialog/buy-dialog-result/dialog-result';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { BuyDialogResult } from '../../buy-dialog/buy-dialog-result/buy-dialog-result.dialog';

@Component({
    selector: 'kit-offer-dialog',
    styleUrls: [ 'offer-dialog.dialog.scss' ],
    templateUrl: 'offer-dialog.dialog.html',
})
export class OfferDialog {
    loading = false;
    DialogResult = DialogResult;

    offerCallGroup: FormGroup;
    offerCallForm(value: string): AbstractControl | null { return this.offerCallGroup.get(value); }

    constructor(
        public dialogRef: MatDialogRef<OfferDialog>,
        public cartService: CartService,
        public dialog: MatDialog) {
        this.offerCallGroup = new FormGroup({
            nameControl: new FormControl('', [Validators.required]),
            phoneControl: new FormControl('', [Validators.required, Validators.minLength(9)])
        });
    }

    async offerCall() {
        Object.keys(this.offerCallGroup.controls).forEach(key => {
            this.offerCallGroup.get(key).markAsTouched();
        });
        this.offerCallGroup.updateValueAndValidity();
        if (this.offerCallGroup.invalid) {
            return;
        }
        this.loading = true;

        let name = this.offerCallForm('nameControl').value;
        let phoneNumber = this.offerCallForm('phoneControl').value;

        try {

            let purchaseResult = await this.cartService.offerCall({ name, phoneNumber});
            if (purchaseResult) {

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
