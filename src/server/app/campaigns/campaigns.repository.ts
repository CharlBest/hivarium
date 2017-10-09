import { v1 as neo4j } from 'neo4j-driver';
import { Database } from '../../core/database';
import { BaseRepository, Folder, Campaigns, Users } from '../shared/base-repository';
import { NewsletterMemberViewModel } from '../../view-models/newsletter/newsletter-member.view-model';
import { UserModel } from '../../models/user/user.model';
import { DoesUsernameAndEmailExist } from '../../view-models/create-user/does-username-and-email-exist.view-model';
import { TutorialType } from '../../view-models/tutorial/tutorial-type.enum';
import { CompletedTutorial } from '../../view-models/tutorial/completed-tutorial.view-model';
import { CampaignModel } from '../../models/campaign/campaign.model';

export class CampaignsRepository extends BaseRepository {

    constructor() {
        super();
    }

    public async createCampaign(session: neo4j.Session, uId: string, email: string): Promise<CampaignModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.CreateCampaign)}`);
        const result = await session.run(query.data, { uId, email });

        const user = result.records.map(x => Database.createNodeObject(x.get('campaign'))) as CampaignModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async getCampaigns(session: neo4j.Session): Promise<CampaignModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.GetCampaigns)}`);
        const result = await session.run(query.data);

        const user = result.records.map(x => Database.createNodeObject(x.get('campaign'))) as CampaignModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }


    public async getCampaign(session: neo4j.Session, userId: number, campaignId: number): Promise<CampaignModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.GetCampaign)}`);
        const result = await session.run(query.data, { userId, campaignId });

        const user = result.records.map(x => Database.createNodeObject(x.get('campaign'))) as CampaignModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }
}
