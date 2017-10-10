import { v1 as neo4j } from 'neo4j-driver';
import { Database } from '../../core/database';
import { BaseRepository, Folder, Campaigns, Users } from '../shared/base-repository';
import { NewsletterMemberViewModel } from '../../view-models/newsletter/newsletter-member.view-model';
import { UserModel } from '../../models/user/user.model';
import { DoesUsernameAndEmailExist } from '../../view-models/create-user/does-username-and-email-exist.view-model';
import { TutorialType } from '../../view-models/tutorial/tutorial-type.enum';
import { CompletedTutorial } from '../../view-models/tutorial/completed-tutorial.view-model';
import { CampaignModel } from '../../models/campaign/campaign.model';
import { CampaignViewModel } from '../../view-models/campaign/campaign.view-model';
import { CreateCampaignViewModel } from '../../view-models/campaign/create-campaign.view-model';

export class CampaignsRepository extends BaseRepository {

    constructor() {
        super();
    }

    public async createCampaign(session: neo4j.Session, userId: number, campaignUId: string, viewModel: CreateCampaignViewModel): Promise<CampaignModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.CreateCampaign)}`);
        const result = await session.run(query.data, {
            userId,
            uId: campaignUId,
            title: viewModel.title,
            description: viewModel.description,
            daysDuration: viewModel.daysDuration,
            fullDescription: viewModel.fullDescription,
            media: viewModel.media,
            referralPercentage: viewModel.referralPercentage,
            milestones: viewModel.milestones,
            products: viewModel.products
        });

        const campaign = result.records.map(x => Database.createNodeObject(x.get('campaign'))) as CampaignModel[];
        if (campaign !== null && campaign.length > 0) {
            return campaign[0];
        } else {
            return null;
        }
    }

    public async getCampaigns(session: neo4j.Session): Promise<CampaignViewModel[]> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.GetCampaigns)}`);
        const result = await session.run(query.data);

        const campaigns = result.records.map(x => {
            return new CampaignViewModel(
                Database.createNodeObject(x.get('campaign')),
                Database.createNodeObject(x.get('user')),
                Database.createNodeObjectArray(x.get('milestones')),
                Database.createNodeObjectArray(x.get('products'))
            );
        });

        if (campaigns !== null && campaigns.length > 0) {
            return campaigns;
        } else {
            return null;
        }
    }


    public async getCampaign(session: neo4j.Session, userId: number, uId: string): Promise<CampaignViewModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.GetCampaign)}`);
        const result = await session.run(query.data, { uId });

        const campaign = result.records.map(x => {
            return new CampaignViewModel(
                Database.createNodeObject(x.get('campaign')),
                Database.createNodeObject(x.get('user')),
                Database.createNodeObjectArray(x.get('milestones')),
                Database.createNodeObjectArray(x.get('products'))
            );
        });

        if (campaign !== null && campaign.length > 0) {
            return campaign[0];
        } else {
            return null;
        }
    }
}
