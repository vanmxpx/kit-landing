import { Component, AfterViewInit, Inject, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyDialog } from './components/buy-dialog/buy-dialog.dialog';
import { MatBottomSheet } from '@angular/material';
import { CartService } from './services/cart.service';
import { Product } from './models/product';
import { CartSheet } from './components/cart-sheet/cart-sheet.sheet';
import { Category } from './models/category';
import { WINDOW } from './services/window.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'kit-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    subNavHidden: boolean = true;
    constructor(
        private dialog: MatDialog,
        private bottomSheet: MatBottomSheet,
        public cartService: CartService,
        @Inject(WINDOW) private window,
        @Inject(DOCUMENT) private document
    ) { }


    ngOnInit() {
        this.onWindowScroll();
        this.cartService.addToCart({
            id: 25,
            name: 'Transmitter',
            description: 'Модуль интеграции сторонних датчиков в систему безопасности Ajax',
            imageBlack: 'assets/products/10Moduls/Transmitter@1x.jpg',
            cost: 899,
            quantity: 1, selectedColor: 'black', imageWhite: ''
        });
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scroll = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        if (scroll > 1400) {
            this.subNavHidden = false;
        } else if (!this.subNavHidden && scroll < 1400) {
            this.subNavHidden = true;
        }
    }

    public smoothScroll(id: string): void {
        const elem = document.getElementById(id);
        if (elem) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start'  });
        } else {
            console.error('Cannot scroll to unexisting elemet.');
        }
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }

    openCart(): void {
        this.bottomSheet.open(CartSheet);
    }

    // tslint:disable-next-line:member-ordering
    categories: Category[] = [
        {
            name: 'Быстрый старт для защиты дома',
            // tslint:disable-next-line:max-line-length
            description: 'Стартовый комплект Ajax состоит из самого необходимого для защиты помещения от вторжения. Чувствительные датчики контролируют двери и активность внутри, а мощный хаб связывает их с внешним миром.',
            products: [
                {
                    id: 0,
                    name: 'StarterKit',
                    description: 'Стартовый комплект системы безопасности Ajax',
                    imageBlack: 'assets/products/1StarterKit/SK_B-1x.png',
                    cost: 5799,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/1StarterKit/SK_W-1x.png'
                },
                {
                    id: 1,
                    name: 'StarterKit Plus',
                    description: 'Продвинутый cтартовый комплект',
                    imageBlack: 'assets/products/1StarterKit/SK_B-1x.png',
                    cost: 8449,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/1StarterKit/SK_W-1x.png'
                }
            ]
        },
        {
            name: 'Мозг системы',
            // tslint:disable-next-line:max-line-length
            description: 'К хабу подключаются все датчики Ajax. Он умножает возможности устройств, контролирует их работу, отправляет сообщения о тревогах владельцу и на пульт  охраны',
            products: [
                {
                    id: 2,
                    name: 'Hub',
                    description: 'Интеллектуальная централь системы безопасности c GSM и Ethernet',
                    imageBlack: 'assets/products/2Hub/HUB_B-1x.png',
                    cost: 3849,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/2Hub/HUB_W-1x.png'
                },
                {
                    id: 3,
                    name: 'Hub Plus',
                    description: 'Интеллектуальная централь системы безопасности с расширенными коммуникационными возможностями',
                    imageBlack: 'assets/products/2Hub/HUB_B-1x.png',
                    cost: 6189,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/2Hub/HUB_W-1x.png'
                },
                {
                    id: 4,
                    name: 'ReX',
                    description: 'Интеллектуальный ретранслятор сигнала системы безопасности',
                    imageBlack: 'assets/products/2Hub/HUB_B-1x.png',
                    cost: 2199,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/2Hub/HUB_W-1x.png'
                }
            ]
        },
        {
            name: 'Защита от вторжения',
            // tslint:disable-next-line:max-line-length
            description: 'Охранные датчики определяют движение в помещении, взлом окна и дверей, фиксируют разбитие стекла. Устанавливаются на основу из любых материалов.',
            products: [
                {
                    id: 5,
                    name: 'MotionProtect',
                    description: 'Беспроводной датчик движения с иммунитетом к животным',
                    imageBlack: 'assets/products/3MotionProtect/MP_B-1x.png',
                    cost: 1019,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/3MotionProtect/MP_W-1x.png'
                },
                {
                    id: 6,
                    name: 'MotionProtect Plus',
                    description: 'Беспроводной датчик движения с микроволновым сенсором и иммунитетом к животным',
                    imageBlack: 'assets/products/3MotionProtect/MP_B-1x.png',
                    cost: 1599,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/3MotionProtect/MP_W-1x.png'
                },
                {
                    id: 7,
                    name: 'CombiProtect',
                    description: 'Беспроводной датчик движения и разбития стекла с иммунитетом к животным',
                    imageBlack: 'assets/products/3MotionProtect/MP_B-1x.png',
                    cost: 1599,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/3MotionProtect/MP_W-1x.png'
                },
                {
                    id: 8,
                    name: 'DoorProtect',
                    description: 'Беспроводной датчик открытия дверей и окон',
                    imageBlack: 'assets/products/4Door/DP_B-1x.png',
                    cost: 749,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/4Door/DP_W-1x.png'
                },
                {
                    id: 9,
                    name: 'DoorProtect Plus',
                    description: 'Беспроводной датчик открытия, удара и наклона',
                    imageBlack: 'assets/products/4Door/DP_B-1x.png',
                    cost: 1019,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/4Door/DP_W-1x.png'
                },
                {
                    id: 10,
                    name: 'GlassProtect',
                    description: 'Беспроводной датчик разбития стекла',
                    imageBlack: 'assets/products/4Door/GP_B-1x.png',
                    cost: 1149,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/4Door/GP_W-1x.png'
                },
                {
                    id: 11,
                    name: 'MotionProtect Curtain',
                    description: 'Беспроводной уличный датчик движения штора с защитой от маскирования и иммунитетом к животным',
                    imageBlack: 'assets/products/4Door/MotionProtectCurtain_black@1x.png',
                    cost: 1999,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/4Door/MotionProtectCurtain_white@1x.png'
                },
                {
                    id: 12,
                    name: 'MotionProtect Outdoor',
                    description: 'Беспроводной уличный датчик движения с защитой от маскирования и иммунитетом к животным',
                    imageBlack: 'assets/products/4Door/MPO-B-1x.png',
                    cost: 3149,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/4Door/MPO-W-1x.png'
                },
            ]
        },
        {
            name: 'Защита от пожара',
            // tslint:disable-next-line:max-line-length
            description: 'Извещатели со встроенной сиреной точно определяют дым, огонь и опасный уровень угарного газа в помещении. Устанавливаются на потолке, управляются со смартфона.',
            products: [
                {
                    id: 13,
                    name: 'FireProtect',
                    description: 'Беспроводной дымо-тепловой датчик с сиреной',
                    imageBlack: 'assets/products/5FireProtect/FP_B-1x.png',
                    cost: 1349,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/5FireProtect/FP_W-1x.png'
                },
                {
                    id: 14,
                    name: 'FireProtect Plus',
                    description: 'Беспроводной дымо-тепловой датчик с сенсором угарного газа и сиреной',
                    imageBlack: 'assets/products/5FireProtect/FP_B-1x.png',
                    cost: 2049,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/5FireProtect/FP_W-1x.png'
                }
            ]
        },
        {
            name: 'Защита от потопа',
            // tslint:disable-next-line:max-line-length
            description: 'Датчики определяют прорыв трубы, протечку стиральной или посудомоечной машины. Устанавливаются за минуту без использования инструментов.',
            products: [
                {
                    id: 15,
                    name: 'LeaksProtect',
                    description: 'Беспроводной датчик раннего обнаружения затопления',
                    imageBlack: 'assets/products/6WaterProtect/LP_B-1x.png',
                    cost: 899,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/6WaterProtect/LP_W-1x.png'
                }
            ]
        },
        {
            name: 'Пульты управления',
            description: 'Помогают управлять системой безопасности и моментально отправляют сигнал тревоги по нажатию одной кнопки.',
            products: [
                {
                    id: 16,
                    name: 'SpaceControl',
                    description: 'Брелок управления системой безопасности с тревожной кнопкой',
                    imageBlack: 'assets/products/7SpaceControl/SC_B-1x.png',
                    cost: 499,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/7SpaceControl/SC_W-1x.png'
                },
                {
                    id: 17,
                    name: 'KeyPad',
                    description: 'Беспроводная сенсорная клавиатура управления системой безопасности',
                    imageBlack: 'assets/products/7SpaceControl/KP_B-1x.png',
                    cost: 1589,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/7SpaceControl/KP_W-1x.png'
                }
            ]
        },
        {
            name: 'Сирены',
            // tslint:disable-next-line:max-line-length
            description: 'Звуковые оповещатели для дома и улицы. Громко сообщают о тревогах, привлекают внимание соседей и отпугивают злоумышленников.',
            products: [
                {
                    id: 18,
                    name: 'HomeSiren',
                    description: 'Беспроводная комнатная сирена',
                    imageBlack: 'assets/products/8Siren/HS_B-1x.png',
                    cost: 1149,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/8Siren/HS_W-1x.png'
                },
                {
                    id: 19,
                    name: 'StreetSiren',
                    description: 'Беспроводная уличная сирена',
                    imageBlack: 'assets/products/8Siren/SS_B-1x.png',
                    cost: 2249,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/8Siren/SS_W-1x.png'
                }
            ]
        },
        {
            name: 'Автоматизация',
            description: 'Реле для дистанционного управления бытовой техникой, электрозамками, воротами, ролетами.',
            products: [
                {
                    id: 20,
                    name: 'Socket',
                    description: 'Радиоуправляемая умная розетка со счетчиком энергопотребления',
                    imageBlack: 'assets/products/9Sockets/Socket_B@1x.png',
                    cost: 1099,
                    quantity: 1, selectedColor: 'black', imageWhite: 'assets/products/9Sockets/Socket_W@1x.png'
                },
                {
                    id: 21,
                    name: 'WallSwitch',
                    description: 'Силовое реле дистанционного управления питанием со счетчиком энергопотребления',
                    imageBlack: 'assets/products/9Sockets/WS1@1x.png',
                    cost: 789,
                    quantity: 1, selectedColor: 'black', imageWhite: ''
                },
                {
                    id: 22,
                    name: 'Relay',
                    description: 'Слаботочное реле дистанционного управления c сухим контактом',
                    imageBlack: 'assets/products/9Sockets/WS1@1x.png',
                    cost: 789,
                    quantity: 1, selectedColor: 'black', imageWhite: ''
                }
            ]
        },
        {
            name: 'Модули интеграции',
            // tslint:disable-next-line:max-line-length
            description: 'Устройства для включения сторонних датчиков в систему Ajax, а также для работы датчиков Ajax в составе проводных сигнализаций и систем умного дома.',
            products: [
                {
                    id: 23,
                    name: 'uartBridge',
                    description: 'Модуль интеграции датчиков Ajax в беспроводные охранные и smart home системы',
                    imageBlack: 'assets/products/10Moduls/uartBridge@1x.png',
                    cost: 749,
                    quantity: 1, selectedColor: 'black', imageWhite: ''
                },
                {
                    id: 24,
                    name: 'ocBridge Plus',
                    description: 'Модуль интеграции датчиков Ajax в проводные и гибридные системы безопасности',
                    imageBlack: 'assets/products/10Moduls/ocBridge_Plus@1x.png',
                    cost: 899,
                    quantity: 1, selectedColor: 'black', imageWhite: ''
                },
                {
                    id: 25,
                    name: 'Transmitter',
                    description: 'Модуль интеграции сторонних датчиков в систему безопасности Ajax',
                    imageBlack: 'assets/products/10Moduls/Transmitter@1x.png',
                    cost: 899,
                    quantity: 1, selectedColor: 'black', imageWhite: ''
                }
            ]
        }
   ];

}
