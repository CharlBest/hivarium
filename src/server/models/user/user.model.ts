import { ShippingAddressModel } from './shipping-address.model';

export class UserModel {
    id: number;
    uId: string;
    email: string;
    username: string;
    password: string;
    passwordSalt: string;
    dateCreated: number;
    isVerified: boolean;
    views: number;
    bio: string;
    avatarUrl: string;
    emailCode: string;
    emailVerified: boolean;
    emailVerifiedDateCreated: number;
    forgotPasswordCodes: string[];

    hiveCoins: number;
    // TODO: this prop is only populated for profile page
    shippingAddresses: ShippingAddressModel[];

    // TODO: user role/permission
}
