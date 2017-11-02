import { ProductModel } from '../../models/campaign/product.model';

export class OrderValidationModel {
    userExists: boolean;
    productExists: boolean;
    userHasEnoughHiveCoins: boolean;
    productHasEnoughQuantity: boolean;
    validReferral: boolean;
    userHasShippingAddress: boolean;

    product: ProductModel;
}
