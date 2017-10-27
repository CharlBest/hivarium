import { NextFunction, Request, Response, Router } from 'express';
import { v4 as nodeUUId } from 'node-uuid';
import { Database } from '../../core/database';
import { BaseController } from '../shared/base-controller';
import { ValidationUtil } from '../../core/utils/validation-util';
import { Emailer } from '../../email/emailer';
import { Validators } from '../../validation/validators';
import { LoginViewModel } from '../../view-models/create-user/login.view-model';
import { CreateUserViewModel } from '../../view-models/create-user/create-user.view-model';
import { NewsletterMemberViewModel } from '../../view-models/newsletter/newsletter-member.view-model';
import { ForgotPasswordViewModel } from '../../view-models/forgot-password/forgot-password.view-model';
import { ChangeForgottenPasswordViewModel } from '../../view-models/forgot-password/change-forgotten-password.view-model';
import { UpdateAvatarViewModel } from '../../view-models/profile/update-avatar.view-model';
import { UpdateBioViewModel } from '../../view-models/profile/update-bio.view-model';
import { UpdatePasswordViewModel } from '../../view-models/profile/update-password.view-model';
import { FeedbackViewModel } from '../../view-models/feedback/feedback.view-model';
import { TutorialType } from '../../view-models/tutorial/tutorial-type.enum';
import { CompletedTutorial } from '../../view-models/tutorial/completed-tutorial.view-model';
import { CampaignsService } from './campaigns.service';
import { GetCampaignViewModel } from '../../view-models/campaign/get-campaign.view-model';
import { CreateCampaignViewModel } from '../../view-models/campaign/create-campaign.view-model';

export class CampaignsController extends BaseController {
    private campaignsService: CampaignsService;

    constructor() {
        super();
        this.campaignsService = new CampaignsService();
    }

    public async createCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const viewModel = req.body as CreateCampaignViewModel;

            const valid = Validators.required({ value: viewModel.title }) ||
                Validators.required({ value: viewModel.description }) ||
                Validators.required({ value: viewModel.daysDuration }) ||
                Validators.required({ value: viewModel.fullDescription }) ||
                Validators.required({ value: viewModel.media }) ||
                Validators.required({ value: viewModel.referralPercentage }) ||
                // Validators.required({ value: viewModel.milestones }) ||
                // Validators.required({ value: viewModel.products }) ||
                null;

            if (valid !== null) {
                throw ValidationUtil.createValidationErrors(valid);
            }

            const campaignUId = nodeUUId();

            const response = await this.campaignsService.createCampaign(Database.getSession(req), this.getUserId(req), campaignUId, viewModel);
            // Emailer.welcomeEmail(response.email, response.username, response.emailCode);

            res.status(200).json(response);
        } catch (error) {
            this.returnError(res, error);
        }
    }

    public async getCampaigns(req: Request, res: Response, next: NextFunction) {
        try {
            const skip = +req.params.skip as number;
            const valid = Validators.required({ value: skip }) ||
                null;

            if (valid !== null) {
                throw ValidationUtil.createValidationErrors(valid);
            }

            const response = await this.campaignsService.getCampaigns(Database.getSession(req), skip);
            res.status(200).json(response);
        } catch (error) {
            this.returnError(res, error);
        }
    }

    public async getCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const uId = req.params.uId as string;

            const valid = Validators.required({ value: uId }) ||
                null;

            if (valid !== null) {
                throw ValidationUtil.createValidationErrors(valid);
            }

            const response = await this.campaignsService.getCampaign(Database.getSession(req), this.getUserId(req), uId);
            res.status(200).json(response);
        } catch (error) {
            this.returnError(res, error);
        }
    }

    public async getOrCreateCampaignReferralLink(req: Request, res: Response, next: NextFunction) {
        try {
            const uId = req.params.uId as string;

            const valid = Validators.required({ value: uId }) ||
                null;

            if (valid !== null) {
                throw ValidationUtil.createValidationErrors(valid);
            }

            const response = await this.campaignsService.getOrCreateCampaignReferralLink(Database.getSession(req), this.getUserId(req), uId);
            res.status(200).json(response);
        } catch (error) {
            this.returnError(res, error);
        }
    }
}
