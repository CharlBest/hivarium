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
import { CreateOrderViewModel } from '../../view-models/order/create-order.view-model';
import { OrderModel } from '../../models/campaign/order.model';
import { OrderValidationModel } from '../../models/campaign/order-validation.model';

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

    public async getCampaigns(session: neo4j.Session, skip: number): Promise<CampaignViewModel[]> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.GetCampaigns)}`);
        const result = await session.run(query.data, { skip });

        const campaigns = result.records.map(x => {
            return new CampaignViewModel(
                Database.createNodeObject(x.get('campaign')),
                Database.createNodeObject(x.get('user')),
                null,
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


    public async getCampaign(session: neo4j.Session, userId: number, uId: string, refCode: string): Promise<CampaignViewModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.GetCampaign)}`);
        const result = await session.run(query.data, { uId, refCode });

        const campaign = result.records.map(x => {
            return new CampaignViewModel(
                Database.createNodeObject(x.get('campaign')),
                Database.createNodeObject(x.get('user')),
                x.get('refUser'),
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

    public async getOrCreateCampaignReferralLink(session: neo4j.Session, userId: number, uId: string, refLinkUId: string): Promise<string> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.GetOrCreateCampaignReferralLink)}`);
        const result = await session.run(query.data, { userId, uId, refLinkUId });

        const campaign = result.records;

        if (campaign !== null && campaign.length > 0) {
            const refLink = campaign[0].get('refLink');
            if (refLink === null) {
                return refLinkUId;
            } else {
                return refLink;
            }
        } else {
            return null;
        }
    }

    public async createOrder(session: neo4j.Session, userId: number, orderUId: string, viewModel: CreateOrderViewModel): Promise<OrderModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.CreateOrder)}`);
        const result = await session.run(query.data, {
            userId,
            orderUId,
            token: viewModel.token,
            productUId: viewModel.productUId,
            quantity: viewModel.quantity,
            hiveCoins: viewModel.hiveCoins,
            referralCode: viewModel.referralCode,
            shippingAddressUId: viewModel.shippingAddressUId
        });

        const order = result.records.map(x => Database.createNodeObject(x.get('order'))) as OrderModel[];
        if (order !== null && order.length > 0) {
            return order[0];
        } else {
            return null;
        }
    }

    public async orderValidation(session: neo4j.Session, userId: number, viewModel: CreateOrderViewModel): Promise<OrderValidationModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Campaigns, Campaigns.OrderValidation)}`);
        const result = await session.run(query.data, {
            userId,
            token: viewModel.token,
            productUId: viewModel.productUId,
            quantity: viewModel.quantity,
            hiveCoins: viewModel.hiveCoins,
            referralCode: viewModel.referralCode,
            shippingAddressUId: viewModel.shippingAddressUId
        });

        console.log(result);

        const data = result.records.map(x => {
            const model = new OrderValidationModel();
            model.userExists = x.get('userExists');
            model.productExists = x.get('productExists');
            model.userHasEnoughHiveCoins = x.get('userHasEnoughHiveCoins');
            model.productHasEnoughQuantity = x.get('productHasEnoughQuantity');
            model.validReferral = x.get('validReferral');
            model.userHasShippingAddress = x.get('userHasShippingAddress');
            model.product = Database.createNodeObject(x.get('product'));
            return model;
        });

        if (data !== null && data.length > 0) {
            return data[0];
        } else {
            return null;
        }
    }
}
