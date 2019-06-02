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
            name: 'Мозг системы',
            description: 'К хабу подключаются все датчики Ajax. Он умножает возможности устройств, контролирует их работу, отправляет сообщения о тревогах владельцу и на пульт  охраны',
            products: [ 
                { 
                    name: 'Hub',
                    description: 'Интеллектуальная централь системы безопасности c GSM и Ethernet',
                    image: 'assets/products/2Hub/HUB_B-1x.png',
                    cost: '3 849'
                },
                { 
                    name: 'Hub Plus',
                    description: 'Интеллектуальная централь системы безопасности с расширенными коммуникационными возможностями',
                    image: 'assets/products/2Hub/HUB_W-1x.png',
                    cost: '6 189'
                },
                { 
                    name: 'ReX',
                    description: 'Интеллектуальный ретранслятор сигнала системы безопасности',
                    image: 'assets/products/2Hub/HUB_B-1x.png',
                    cost: '2 199'
                }
            ]
        },
        { 
            name: 'Защита от вторжения',
            description: 'Охранные датчики определяют движение в помещении, взлом окна и дверей, фиксируют разбитие стекла. Устанавливаются на основу из любых материалов.',
            products: [ 
                { 
                    name: 'MotionProtect',
                    description: 'Беспроводной датчик движения с иммунитетом к животным',
                    image: 'assets/products/3MotionProtect/MP_B-1x.png',
                    cost: '1 019'
                },
                { 
                    name: 'MotionProtect Plus',
                    description: 'Беспроводной датчик движения с микроволновым сенсором и иммунитетом к животным',
                    image: 'assets/products/3MotionProtect/MP_W-1x.png',
                    cost: '1 599'
                },
                { 
                    name: 'CombiProtect',
                    description: 'Беспроводной датчик движения и разбития стекла с иммунитетом к животным',
                    image: 'assets/products/3MotionProtect/MP_B-1x.png',
                    cost: '1 599'
                },
                { 
                    name: 'DoorProtect',
                    description: 'Беспроводной датчик открытия дверей и окон',
                    image: 'assets/products/4Door/DP_B-1x.png',
                    cost: '749'
                },
                { 
                    name: 'DoorProtect Plus',
                    description: 'Беспроводной датчик открытия, удара и наклона',
                    image: 'assets/products/4Door/DP_W-1x.png',
                    cost: '1 019'
                },
                { 
                    name: 'GlassProtect',
                    description: 'Беспроводной датчик разбития стекла',
                    image: 'assets/products/4Door/GP_W-1x.png',
                    cost: '1 149'
                },
                { 
                    name: 'MotionProtect Curtain',
                    description: 'Беспроводной уличный датчик движения штора с защитой от маскирования и иммунитетом к животным',
                    image: 'assets/products/4Door/MotionProtectCurtain_white@1x.jpg',
                    cost: '1 999'
                },
                { 
                    name: 'MotionProtect Outdoor',
                    description: 'Беспроводной уличный датчик движения с защитой от маскирования и иммунитетом к животным',
                    image: 'assets/products/4Door/MPO-1x.png',
                    cost: '3 149'
                },
            ]
        },
        {
            name: 'Защита от пожара',
            description: 'Извещатели со встроенной сиреной точно определяют дым, огонь и опасный уровень угарного газа в помещении. Устанавливаются на потолке, управляются со смартфона.',
            products: [ 
                { 
                    name: 'FireProtect',
                    description: 'Беспроводной дымо-тепловой датчик с сиреной',
                    image: 'assets/products/5FireProtect/FP_B-1x.png',
                    cost: '1 349'
                },
                { 
                    name: 'FireProtect Plus',
                    description: 'Беспроводной дымо-тепловой датчик с сенсором угарного газа и сиреной',
                    image: 'assets/products/5FireProtect/FP_W-1x.png',
                    cost: '2 049'
                }
            ]
        },
        {
            name: 'Защита от потопа',
            description: 'Датчики определяют прорыв трубы, протечку стиральной или посудомоечной машины. Устанавливаются за минуту без использования инструментов.',
            products: [ 
                { 
                    name: 'LeaksProtect',
                    description: 'Беспроводной датчик раннего обнаружения затопления',
                    image: 'assets/products/6WaterProtect/LP_B-1x.png',
                    cost: '899'
                }
            ]
        },
        {
            name: 'Пульты управления',
            description: 'Помогают управлять системой безопасности и моментально отправляют сигнал тревоги по нажатию одной кнопки.',
            products: [ 
                { 
                    name: 'SpaceControl',
                    description: 'Брелок управления системой безопасности с тревожной кнопкой',
                    image: 'assets/products/7SpaceControl/SC_B-1x.png',
                    cost: '499'
                },
                { 
                    name: 'KeyPad',
                    description: 'Беспроводная сенсорная клавиатура управления системой безопасности',
                    image: 'assets/products/7SpaceControl/KP_B-1x.png',
                    cost: '1 589'
                }
            ]
        },
        {
            name: 'Сирены',
            description: 'Звуковые оповещатели для дома и улицы. Громко сообщают о тревогах, привлекают внимание соседей и отпугивают злоумышленников.',
            products: [ 
                { 
                    name: 'HomeSiren',
                    description: 'Беспроводная комнатная сирена',
                    image: 'assets/products/8Siren/HS_B-1x.png',
                    cost: '1 149'
                },
                { 
                    name: 'StreetSiren',
                    description: 'Беспроводная уличная сирена',
                    image: 'assets/products/8Siren/SS_W-1x.png',
                    cost: '2 249'
                }
            ]
        },
        {
            name: 'Автоматизация',
            description: 'Реле для дистанционного управления бытовой техникой, электрозамками, воротами, ролетами.',
            products: [ 
                { 
                    name: 'Socket',
                    description: 'Радиоуправляемая умная розетка со счетчиком энергопотребления',
                    image: 'assets/products/9Sockets/Socket_black@1x.jpg',
                    cost: '1 099'
                },
                { 
                    name: 'WallSwitch',
                    description: 'Силовое реле дистанционного управления питанием со счетчиком энергопотребления',
                    image: 'assets/products/9Sockets/WS1@1x.jpg',
                    cost: '789'
                },
                { 
                    name: 'Relay',
                    description: 'Слаботочное реле дистанционного управления c сухим контактом',
                    image: 'assets/products/9Sockets/WS1@1x.jpg',
                    cost: '789'
                }
            ]
        },
        {
            name: 'Модули интеграции',
            description: 'Устройства для включения сторонних датчиков в систему Ajax, а также для работы датчиков Ajax в составе проводных сигнализаций и систем умного дома.',
            products: [ 
                { 
                    name: 'uartBridge',
                    description: 'Модуль интеграции датчиков Ajax в беспроводные охранные и smart home системы',
                    image: 'assets/products/10Moduls/uartBridge@1x.jpg',
                    cost: '749'
                },
                { 
                    name: 'ocBridge Plus',
                    description: 'Модуль интеграции датчиков Ajax в проводные и гибридные системы безопасности',
                    image: 'assets/products/10Moduls/ocBridge_Plus@1x.jpg',
                    cost: '899'
                },
                { 
                    name: 'Transmitter',
                    description: 'Модуль интеграции сторонних датчиков в систему безопасности Ajax',
                    image: 'assets/products/10Moduls/Transmitter@1x.jpg',
                    cost: '899'
                }
            ]
        }
   ];   

}
