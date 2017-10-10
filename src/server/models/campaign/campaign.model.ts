import { MilestoneModel } from './milestone.model';

export class CampaignModel {
    uId: string;
    title: string;
    category: string;
    description: string;
    daysDuration: number;
    dateCreated: number;
    fullDescription: string;
    views: number;
    media: string;
    referralPercentage: number;

    get singleReferralPercentage(): number {
        return this.referralPercentage / 2;
    }

    get daysRemaining(): number {
        const daysRemaining = this.daysDuration - (new Date().getDay() - new Date(this.dateCreated).getDay());
        return daysRemaining >= 0 ? daysRemaining : 0;
    }
}
