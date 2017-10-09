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
    milestones: MilestoneModel[];
}
