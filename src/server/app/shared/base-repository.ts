import * as path from 'path';

export class BaseRepository {

    constructor() { }

    protected getQueryPath(folder: Folder, file: Campaigns | Users): string {
        let fileName;
        switch (folder) {
            case Folder.Campaigns:
                fileName = Campaigns[file];
                break;

            case Folder.Users:
                fileName = Users[file];
                break;

            default:
                throw new Error(`Query file name error`);
        }
        return `${Folder[folder]}/${fileName}.cyp`;
    }
}

export enum Folder {
    Campaigns,
    Users
}

export enum Campaigns {
    CreateCampaign,
    GetCampaigns,
    GetCampaign,
    GetOrCreateCampaignReferralLink,
    PaymentRequest
}

export enum Users {
    AddForgottenPasswordCode,
    ChangeForgottenPassword,
    CreateNewsletterMember,
    CreateUser,
    DeleteNewsletterMember,
    DoesUserHavePermissions,
    DoesUsernameAndEmailExist,
    GetUser,
    GetUserById,
    VerifyEmail,
    UpdateAvatar,
    UpdateBio,
    UpdatePassword,
    DeleteUser,
    CompletedTutorial
}
