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
import { CreateOrderViewModel } from '../../view-models/order/create-order.view-model';
import { OrderModel } from '../../models/campaign/order.model';
import { OrderValidationModel } from '../../models/campaign/order-validation.model';
import * as stripe from 'stripe';

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

    public async createOrder(session: neo4j.Session, userId: number, viewModel: CreateOrderViewModel): Promise<OrderModel> {
        // Validation
        // 1 - check if user has enough hive coins that they want to use
        // 2 - check if user has valid shipping address for prodcut
        // 3 - check if there are anough proudcts (quantity) that they want
        // 4 - check if referral code is 1) valid code 2) valid from given product 3) not from same user

        // 5 - if cash payable token is not null
        // 6 - if cash payable payment successful

        const validation = await this.orderValidation(session, userId, viewModel);
        if (validation === null || validation === undefined) {
            throw ValidationUtil.createValidationErrorMessage('general', 'Validation failed');
        }
        if (validation.userExists &&
            validation.productExists &&
            validation.userHasEnoughHiveCoins &&
            validation.productHasEnoughQuantity &&
            (validation.validReferral || viewModel.referralCode === null) &&
            validation.userHasShippingAddress) {
            // TODO: validate if shipping address is valid

            // TODO: add shipping cost to calc
            if (validation.product.cost === viewModel.hiveCoins) {
                return await this.campaignsRepository.createOrder(session, userId, nodeUUId(), viewModel);
            } else {
                if (viewModel.token === null) {
                    throw ValidationUtil.createValidationErrorMessage('token', 'Empty token');
                }

                // TODO: add shipping cost to calc
                const totalPayableAmount = validation.product.cost - viewModel.hiveCoins;

                const stripeAccount = new stripe(environment.stripe.secretKey);
                // Charge the user's card:
                let stripeCharge = null;
                let stripeError = null;
                await stripeAccount.charges.create({
                    amount: totalPayableAmount,
                    currency: 'USD',
                    description: 'Hivarium Product order',
                    source: viewModel.token,
                }, (err, charge) => {
                    if (err) {
                        stripeError = err;
                    }
                    if (charge) {
                        stripeCharge = charge;
                    }
                });

                if (stripeCharge !== null) {
                    return await this.campaignsRepository.createOrder(session, userId, nodeUUId(), viewModel);
                }
                if (stripeError !== null) {
                    throw ValidationUtil.createValidationErrorMessage('stripeError', stripeError);
                }
            }
        } else {
            if (validation.userExists) {
                throw ValidationUtil.createValidationErrorMessage('userExists', 'User does not exist');
            }
            if (validation.productExists) {
                throw ValidationUtil.createValidationErrorMessage('productExists', 'Product does not exist');
            }
            if (validation.userHasEnoughHiveCoins) {
                throw ValidationUtil.createValidationErrorMessage('userHasEnoughHiveCoins', 'user does not have enough HiveCoins');
            }
            if (validation.productHasEnoughQuantity) {
                throw ValidationUtil.createValidationErrorMessage('productHasEnoughQuantity', 'Not enough proudct available');
            }
            if (validation.validReferral && viewModel.referralCode !== null) {
                throw ValidationUtil.createValidationErrorMessage('validReferral', 'Invalid referral code');
            }
            if (validation.userHasShippingAddress) {
                throw ValidationUtil.createValidationErrorMessage('userHasShippingAddress', 'User did not specify their shipping address');
            }
        }
    }

    public async orderValidation(session: neo4j.Session, userId: number, viewModel: CreateOrderViewModel): Promise<OrderValidationModel> {
        return await this.campaignsRepository.orderValidation(session, userId, viewModel);
    }
}
