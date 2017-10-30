import { UserModel } from '../../models/user/user.model';
import { CampaignModel } from '../../models/campaign/campaign.model';
import { ProductModel } from '../../models/campaign/product.model';

export class UserViewModel {
    user: UserModel;
    campaigns: CampaignModel[];
    products: ProductModel[];
}
