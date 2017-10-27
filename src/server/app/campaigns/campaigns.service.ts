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
import { CampaignViewModel } from '../../view-models/campaign/campaign.view-model';
import { CreateCampaignViewModel } from '../../view-models/campaign/create-campaign.view-model';

export class CampaignsService extends BaseService {

    private campaignsRepository: CampaignsRepository;

    constructor() {
        super();
        this.campaignsRepository = new CampaignsRepository();
    }

    public async createCampaign(session: neo4j.Session, userId: number, campaignUId: string, viewModel: CreateCampaignViewModel): Promise<CampaignModel> {
        // TODO: validation checks
        viewModel.products.forEach(x => x.uId = nodeUUId());
        return await this.campaignsRepository.createCampaign(session, userId, campaignUId, viewModel);
    }

    public async getCampaigns(session: neo4j.Session, skip: number): Promise<CampaignViewModel[]> {
        return await this.campaignsRepository.getCampaigns(session, skip);
    }

    public async getCampaign(session: neo4j.Session, userId: number, uId: string, refCode: string): Promise<CampaignViewModel> {
        return await this.campaignsRepository.getCampaign(session, userId, uId, refCode);
    }

    public async getOrCreateCampaignReferralLink(session: neo4j.Session, userId: number, uId: string): Promise<string> {
        return await this.campaignsRepository.getOrCreateCampaignReferralLink(session, userId, uId, nodeUUId());
    }
}
