import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OfferDialog } from './offer-dialog/offer-dialog.dialog';
@Component({
  selector: 'kit-calloffer',
  templateUrl: './calloffer.component.html',
  styleUrls: ['./calloffer.component.scss']
})
export class CallOfferComponent implements OnInit {
    constructor(public dialog: MatDialog) {

     }
    ngOnInit() {
        let delay_callOfferPopup = 15000;
        // setTimeout(this.openHint, delay_callOfferPopup);
    }

    openHint() {
        document.getElementById('offer-window').style.display = 'block';
    }

    openDialog() {
        this.dialog.open(OfferDialog);
        document.getElementById('offer-window').style.display = 'none';
    }
}
