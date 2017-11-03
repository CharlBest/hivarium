import { CampaignModel } from '../../models/campaign/campaign.model';
import { ProductModel } from '../../models/campaign/product.model';
import { UserModel } from '../../models/user/user.model';
import { MilestoneModel } from '../../models/campaign/milestone.model';
import { ShippingAddressModel } from '../../models/user/shipping-address.model';
import { ShippingCountry } from '../../models/campaign/shipping-countries';

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
        if (unlockedMilestones.length === 0) {
            return 0;
        }

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

    totalProductReward(productCost: number) {
        return this.productMilestoneReward(productCost, true) + this.productReferralReward(productCost, true);
    }

    maximunTotalProductReward(productCost: number) {
        return this.productMaxMilestoneReward(productCost, true) - this.productMilestoneReward(productCost, true);
    }

    doesShipToUser(product: ProductModel, userShippingAddress: ShippingAddressModel): boolean {
        if (product !== null && userShippingAddress !== null) {
            if (product.shippingCountires === null || product.shippingCountires === undefined || product.shippingCountires.length === 0) {
                return true;
            } else if (product.shippingCountires.some(x => x.id === 0)) {
                // Ships to entire world
                return true;
            } else if (product.shippingCountires.some(x => x.id === 1) && userShippingAddress.country.euCountry) {
                // EU countries
                return true;
            } else if (product.shippingCountires.some(x => x.id === userShippingAddress.country.id)) {
                // Certain countries
                return true;
            } else {
                return false;
            }
        } else {
            return null;
        }
    }

    // TODO: add EU country pricing
    shippingCost(product: ProductModel, quantity: number, userShippingAddressCountry: ShippingCountry): number {
        if (product.shippingCountires === null || product.shippingCountires === undefined || product.shippingCountires.length === 0) {
            return 0;
        } else if (product.shippingCountires.some(x => x.id === 0)) {
            // Ships to entire world
            const destinationAddress = product.shippingCountires.find(x => x.id === userShippingAddressCountry.id) || null;
            if (destinationAddress !== null) {
                return this.calculateShippingCost(quantity, destinationAddress.singleAmount, destinationAddress.extraAmount);
            } else {
                const entireWorldShipping = product.shippingCountires.find(x => x.id === 0);
                return this.calculateShippingCost(quantity, entireWorldShipping.singleAmount, entireWorldShipping.extraAmount);
            }
        } else if (product.shippingCountires.some(x => x.id === userShippingAddressCountry.id)) {
            // Certain countries
            const certainCountryShipping = product.shippingCountires.find(x => x.id === userShippingAddressCountry.id);
            return this.calculateShippingCost(quantity, certainCountryShipping.singleAmount, certainCountryShipping.extraAmount);
        }
    }

    private calculateShippingCost(quantity: number, singleAmount: number, extraAmount: number): number {
        if (quantity === 1) {
            return singleAmount;
        } else if (quantity > 1) {
            return singleAmount + ((quantity - 1) * extraAmount);
        }
    }
}
