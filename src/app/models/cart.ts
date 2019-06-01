import { Product } from './product';
import { PaymentMethod } from './payment-method';

export class Cart  {
    products: Product[];
    userName: string;
    phoneNumber: string;
    paymentMethod: PaymentMethod;
    comment: string;
    constructor( ) {
        this.products = []
    }

}
