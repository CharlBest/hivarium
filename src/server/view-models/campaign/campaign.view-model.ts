import { CampaignModel } from '../../models/campaign/campaign.model';
import { ProductModel } from '../../models/campaign/product.model';
import { UserModel } from '../../models/user/user.model';

export class CampaignViewModel {
    campaign: CampaignModel;
    user: UserModel;
    products: ProductModel[];
}
