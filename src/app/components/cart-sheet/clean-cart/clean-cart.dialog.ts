import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'kit-clean-cart',
    styleUrls: [ 'clean-cart.dialog.scss' ],
    templateUrl: 'clean-cart.dialog.html',
})

export class CleanCartDialog {

    constructor(
        public dialogRef: MatDialogRef<CleanCartDialog>) { }

    onDismiss(): void {
        this.dialogRef.close();
    }

}
