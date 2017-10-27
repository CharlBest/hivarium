import { BaseRoute } from './base.route';

export class CampaignRoutes {

    private static rootRoute = 'campaign';

    public static createCampaign = new BaseRoute(1, CampaignRoutes.rootRoute, 'createCampaign');
    public static getCampaigns = new BaseRoute(1, CampaignRoutes.rootRoute, 'getCampaigns');
    public static getCampaign = new BaseRoute(1, CampaignRoutes.rootRoute, 'getCampaign');
    public static getOrCreateCampaignReferralLink = new BaseRoute(1, CampaignRoutes.rootRoute, 'getOrCreateCampaignReferralLink');
    public static paymentRequest = new BaseRoute(1, CampaignRoutes.rootRoute, 'paymentRequest');
}
