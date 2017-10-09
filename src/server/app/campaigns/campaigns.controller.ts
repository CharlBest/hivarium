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

export class CampaignsController extends BaseController {
    private campaignsService: CampaignsService;

    constructor() {
        super();
        this.campaignsService = new CampaignsService();
    }

    public async createCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const viewModel = req.body as CreateUserViewModel;

            const valid = Validators.required({ value: viewModel.username }) ||
                Validators.required({ value: viewModel.email }) ||
                Validators.required({ value: viewModel.password }) ||
                Validators.minLength(6)({ value: viewModel.password }) ||
                Validators.email({ value: viewModel.email }) ||
                null;

            if (valid !== null) {
                throw ValidationUtil.createValidationErrors(valid);
            }

            const response = await this.campaignsService.createCampaign(Database.getSession(req), viewModel.email);
            // Emailer.welcomeEmail(response.email, response.username, response.emailCode);

            res.status(200).json(response);
        } catch (error) {
            this.returnError(res, error);
        }
    }

    public async getCampaigns(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.campaignsService.getCampaigns(Database.getSession(req));
            res.status(200).json(response);
        } catch (error) {
            this.returnError(res, error);
        }
    }

    public async getCampaign(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.campaignsService.getCampaign(Database.getSession(req), this.getUserId(req), 1);
            res.status(200).json(response);
        } catch (error) {
            this.returnError(res, error);
        }
    }
}
