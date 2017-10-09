import { v1 as neo4j } from 'neo4j-driver';
import { v4 as nodeUUId } from 'node-uuid';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { sign } from 'jsonwebtoken';
import { BaseService } from '../shared/base-service';
import { NewsletterMemberViewModel } from '../../view-models/newsletter/newsletter-member.view-model';
import { TokenViewModel } from '../../view-models/create-user/token.view-model';
import { environment } from '../../environments/environment';
import { UserModel } from '../../models/user/user.model';
import { ValidationUtil } from '../../core/utils/validation-util';
import { DoesUsernameAndEmailExist } from '../../view-models/create-user/does-username-and-email-exist.view-model';
import { TutorialType } from '../../view-models/tutorial/tutorial-type.enum';
import { CompletedTutorial } from '../../view-models/tutorial/completed-tutorial.view-model';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignModel } from '../../models/campaign/campaign.model';

export class CampaignsService extends BaseService {

    private campaignsRepository: CampaignsRepository;

    constructor() {
        super();
        this.campaignsRepository = new CampaignsRepository();
    }

    public async createCampaign(session: neo4j.Session, email: string): Promise<CampaignModel> {
        // TODO: validation checks
        return await this.campaignsRepository.createCampaign(session, nodeUUId(), email);
    }

    public async getCampaigns(session: neo4j.Session): Promise<CampaignModel> {
        return await this.campaignsRepository.getCampaigns(session);
    }

    public async getCampaign(session: neo4j.Session, userId: number, campaignId: number): Promise<CampaignModel> {
        return await this.campaignsRepository.getCampaign(session, userId, campaignId);
    }
}
