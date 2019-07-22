import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogResult } from './dialog-result';

@Component({
    selector: 'kit-buy-dialog-result',
    styleUrls: [ 'buy-dialog-result.dialog.scss' ],
    templateUrl: 'buy-dialog-result.dialog.html',
})
export class BuyDialogResult {
    DialogResult = DialogResult;
    constructor(
        @Inject(MAT_DIALOG_DATA) public result: DialogResult,
        public dialogRef: MatDialogRef<BuyDialogResult>) {
    }
}
