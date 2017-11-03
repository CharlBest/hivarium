import { ProductModel } from '../../models/campaign/product.model';
import { ShippingCountry } from '../../models/campaign/shipping-countries';

export class OrderValidationModel {
    userExists: boolean;
    productExists: boolean;
    userHasEnoughHiveCoins: boolean;
    productHasEnoughQuantity: boolean;
    validReferral: boolean;
    userHasShippingAddress: boolean;

    product: ProductModel;
    userShippingCountryId: number;
}
