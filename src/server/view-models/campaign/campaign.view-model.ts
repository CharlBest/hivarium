import { CampaignModel } from '../../models/campaign/campaign.model';
import { ProductModel } from '../../models/campaign/product.model';
import { UserModel } from '../../models/user/user.model';
import { MilestoneModel } from '../../models/campaign/milestone.model';

export class CampaignViewModel {
    constructor(public campaign: CampaignModel, public owner: UserModel, public refUsername: string, public milestones: MilestoneModel[], public products: ProductModel[]) {
        this.campaign = Object.assign(new CampaignModel(), campaign);
        this.owner = Object.assign(new UserModel(), owner);
        this.milestones = Object.assign(new Array<MilestoneModel>(), milestones.sort((a, b) => a.unlockAtValueOfSales - b.unlockAtValueOfSales));
        this.products = Object.assign(new Array<ProductModel>(), products);
    }

    get totalAvailableProducts(): number {
        let total = 0;
        this.products.forEach(x => total += x.quantity);
        return total;
    }

    get totalAmountSold(): number {
        let total = 0;
        this.products.forEach(x => total += x.sold);
        return total;
    }

    get totalValueOfSales(): number {
        let total = 0;
        this.products.forEach(x => total += (x.sold * x.cost));
        return total;
    }

    get milestonesReached(): number {
        return this.milestones.filter(x => x.unlockAtValueOfSales <= this.totalValueOfSales).length;
    }

    get percentageOfTopMilestoneReached(): number {
        return this.totalValueOfSales / this.milestones[this.milestones.length - 1].unlockAtValueOfSales * 100;
    }

    get minimumMilestoneReward(): number {
        const minToMaxProducts = this.products.sort((a, b) => a.cost - b.cost);
        const result = minToMaxProducts[0].cost * (this.milestones[0].percentageDiscount / 100);
        return Math.trunc(result);
    }

    get maximumMilestoneReward(): number {
        const minToMaxProducts = this.products.sort((a, b) => a.cost - b.cost);
        const result = minToMaxProducts[minToMaxProducts.length - 1].cost * (this.milestones[this.milestones.length - 1].percentageDiscount / 100);
        return Math.trunc(result);
    }

    get minimumReferralReward(): number {
        const minToMaxProducts = this.products.sort((a, b) => a.cost - b.cost);
        const result = minToMaxProducts[0].cost * (this.campaign.singleReferralPercentage / 100);
        return Math.trunc(result);
    }

    get maximumReferralReward(): number {
        const minToMaxProducts = this.products.sort((a, b) => a.cost - b.cost);
        const result = minToMaxProducts[minToMaxProducts.length - 1].cost * (this.campaign.singleReferralPercentage / 100);
        return Math.trunc(result);
    }

    productMilestoneReward(productCost: number, showDecimal = false): number {
        const unlockedMilestones = this.milestones.filter(x => x.unlockAtValueOfSales <= this.totalValueOfSales);
        const highestMilestonePercentageDiscount = unlockedMilestones[unlockedMilestones.length - 1].percentageDiscount;
        const result = productCost * (highestMilestonePercentageDiscount / 100);
        if (showDecimal) {
            return Number(result.toFixed(2));
        } else {
            return Math.trunc(result);
        }
    }

    productMaxMilestoneReward(productCost: number, showDecimal = false): number {
        const highestMilestonePercentageDiscount = this.milestones[this.milestones.length - 1].percentageDiscount;
        const result = Math.trunc(productCost * (highestMilestonePercentageDiscount / 100));
        if (showDecimal) {
            return Number(result.toFixed(2));
        } else {
            return Math.trunc(result);
        }
    }

    productReferralReward(productCost: number, showDecimal = false): number {
        const result = Math.trunc(productCost * (this.campaign.singleReferralPercentage / 100));
        if (showDecimal) {
            return Number(result.toFixed(2));
        } else {
            return Math.trunc(result);
        }
    }
}
