import { ProductModel } from '../../models/campaign/product.model';
import { ShippingDetails } from '../../models/campaign/shipping-details.enum';
import { ShippingCountry } from '../../models/campaign/shipping-countries';

export class CreateProductViewModel extends ProductModel {
    selectedShippingCountries: ShippingCountry[];
    shippingDetails: ShippingDetails;
}
