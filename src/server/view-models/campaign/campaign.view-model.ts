import { CampaignModel } from '../../models/campaign/campaign.model';
import { ProductModel } from '../../models/campaign/product.model';
import { UserModel } from '../../models/user/user.model';
import { MilestoneModel } from '../../models/campaign/milestone.model';

export class CampaignViewModel {
    constructor(public campaign: CampaignModel, public owner: UserModel, public milestones: MilestoneModel[], public products: ProductModel[]) {
        this.campaign = Object.assign(new CampaignModel(), campaign);
        this.owner = Object.assign(new UserModel(), owner);
        this.milestones = Object.assign(new Array<MilestoneModel>(), milestones);
        this.products = Object.assign(new Array<ProductModel>(), products);
    }
}
