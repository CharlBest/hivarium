import { ShippingCountry } from '../campaign/shipping-countries';

export class ShippingAddressModel {
    uId: string;
    dateCreated: number;
    recipientName: string;
    contactNumber: string;
    streetAddress: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: ShippingCountry;
}
