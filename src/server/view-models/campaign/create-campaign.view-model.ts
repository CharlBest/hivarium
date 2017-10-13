import { MilestoneModel } from '../../models/campaign/milestone.model';
import { ProductModel } from '../../models/campaign/product.model';
import { CreateProductViewModel } from './create-product.view-model';

export class CreateCampaignViewModel {
    title: string;
    description: string;
    daysDuration: number;
    fullDescription: string;
    media: string;
    referralPercentage: number;
    milestones: MilestoneModel[];
    products: CreateProductViewModel[];
}
