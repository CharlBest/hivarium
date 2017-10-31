export class OrderPlacedViewModel {
    email: string;
    userId: number;
    username: string;
    orderNumber: string;
    wasReferral: boolean;

    productUId: string;
    productTitle: string;
    productCost: number;
    productMedia: string;
    productQuantityRequested: number;

    totalHiveCoinsUsed: number;

    shippingAddressUId: string;
    shippingAddressRecipientName: string;
    shippingAddressContactNumber: string;
    shippingAddressStreetAddress: string;
    shippingAddressAddressLine2: string;
    shippingAddressCity: string;
    shippingAddressPostalCode: string;
    shippingAddressCountry: string;
}
