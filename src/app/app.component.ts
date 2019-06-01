import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyDialog } from './components/buy-dialog/buy-dialog.dialog';
import { MatBottomSheet } from '@angular/material';
import { CartService } from './services/cart.service';
import { Product } from './models/product';
import { CartSheet } from './components/cart-sheet/cart-sheet.sheet';
import { Category } from './models/category';

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

    
    categories: Category[] = [
        { 
            name: 'Быстрый старт для защиты дома',
            description: 'Стартовый комплект Ajax состоит из самого необходимого для защиты помещения от вторжения. Чувствительные датчики контролируют двери и активность внутри, а мощный хаб связывает их с внешним миром.',
            products: [ 
                { 
                    name: 'StarterKit',
                    description: 'Стартовый комплект системы безопасности Ajax',
                    image: 'assets/products/1StarterKit/SK_B-1x.png',
                    cost: '5 799'
                },
                { 
                    name: 'StarterKit Plus',
                    description: 'Продвинутый cтартовый комплект',
                    image: 'assets/products/1StarterKit/SK_W-1x.png',
                    cost: '8 449'
                }
            ]
        },
        { 
            name: 'sadfdsdgsgdsdsdg',
            description: 'Стартовый комплект Ajax состоит из самого необходимого для защиты помещения от вторжения. Чувствительные датчики контролируют двери и активность внутри, а мощный хаб связывает их с внешним миром.',
            products: [ 
                { 
                    name: 'StarterKit',
                    description: 'Стартовый комплект системы безопасности Ajax',
                    image: 'assets/products/1StarterKit/SK_B-1x.png',
                    cost: '5 799'
                },
                { 
                    name: 'StarterKit Plus',
                    description: 'Продвинутый cтартовый комплект',
                    image: 'assets/products/1StarterKit/SK_W-1x.png',
                    cost: '8 449'
                }
            ]
        },
    ];
}
