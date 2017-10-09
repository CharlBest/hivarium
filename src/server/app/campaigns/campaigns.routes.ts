import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from '../shared/base-route';
import { CampaignRoutes } from '../../routes/campaign.routes';
import { Authentication } from '../../core/middleware/authentication';
import { CampaignsController } from './campaigns.controller';

export class CampaignsRoutes extends BaseRoute {
    campaignsController: CampaignsController;

    constructor() {
        super();
        this.campaignsController = new CampaignsController();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post(CampaignRoutes.createCampaign.constructEndpointUrl(), Authentication.loginRequired, (req, res, next) => this.campaignsController.createCampaign(req, res, next));
        this.router.get(CampaignRoutes.getCampaigns.constructEndpointUrl(), (req, res, next) => this.campaignsController.getCampaigns(req, res, next));
        this.router.get(CampaignRoutes.getCampaign.constructEndpointUrl(), (req, res, next) => this.campaignsController.getCampaign(req, res, next));
    }
}
