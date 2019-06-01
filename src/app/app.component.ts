import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyDialog } from './buy-dialog/buy-dialog.dialog';
import { MatBottomSheet } from '@angular/material';
import { CartSheet } from './cart-sheet/cart-sheet.sheet';
import { CartService } from './services/cart.service';
import { Product } from './models/product';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    

    public smoothScroll(id: string): void {
        let elem = document.getElementById(id);
        if (elem) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        } else { 
            console.error("Cannot scroll to unexisting elemet.");
        }
    }
    constructor(
        private dialog: MatDialog, 
        private bottomSheet: MatBottomSheet,
        private cartService: CartService) {}

    addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }

    openCart(): void {
        this.bottomSheet.open(CartSheet);
    }
  
    openDialog(): void {
        const dialogRef = this.dialog.open(BuyDialog, {
            width: '250px',
            data: { name: 'test', animal: 'another test' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }
}
