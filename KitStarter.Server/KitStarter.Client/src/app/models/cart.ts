import { Product } from './product';
import { PaymentMethod } from './payment-method';
import { DeliveryMethod } from './delivery-method';

export class Cart  {
    products: Product[] = [];
    credentials: Credentials = new Credentials();
    paymentMethod: PaymentMethod = PaymentMethod.VisaMastercard;
    deliveryMethod: DeliveryMethod = DeliveryMethod.Post;
    comment: string = '';
}

export class Credentials {
    name: string = '';
    phoneNumber: string = '';
    email: string = '';
    address: string = '';
}
