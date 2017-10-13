import { ShippingCountry } from './shipping-countries';

export class ProductModel {
    uId: string;
    title: string;
    description: string;
    cost: number;
    quantity: number;
    sold: number;
    media: string;
    shippingCountires: ShippingCountry[];
}
