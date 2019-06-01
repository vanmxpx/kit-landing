import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyData } from '../models/buy-data';



@Component({
    selector: 'buy-dialog',
    styleUrls: [ 'buy-dialog.dialog.scss' ],
    templateUrl: 'buy-dialog.dialog.html',
})
export class BuyDialog {

    constructor(
        public dialogRef: MatDialogRef<BuyDialog>,
        @Inject(MAT_DIALOG_DATA) public data: BuyData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
