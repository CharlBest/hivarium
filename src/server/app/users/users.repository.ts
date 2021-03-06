import { v1 as neo4j } from 'neo4j-driver';
import { Database } from '../../core/database';
import { BaseRepository, Folder, Users } from '../shared/base-repository';
import { NewsletterMemberViewModel } from '../../view-models/newsletter/newsletter-member.view-model';
import { UserModel } from '../../models/user/user.model';
import { DoesUsernameAndEmailExist } from '../../view-models/create-user/does-username-and-email-exist.view-model';
import { TutorialType } from '../../view-models/tutorial/tutorial-type.enum';
import { CompletedTutorial } from '../../view-models/tutorial/completed-tutorial.view-model';
import { UserViewModel } from '../../view-models/user/user.view-model';
import { ShippingAddressModel } from '../../models/user/shipping-address.model';
import { ShippingCountries } from '../../models/campaign/shipping-countries';

export class UsersRepository extends BaseRepository {

    constructor() {
        super();
    }

    public async createUser(session: neo4j.Session, uId: string, email: string, username: string, password: string, passwordSalt: string, emailCode: string): Promise<UserModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.CreateUser)}`);
        const result = await session.run(query.data, { uId, email, username, password, passwordSalt, emailCode });

        const user = result.records.map(x => Database.createNodeObject(x.get('user'))) as UserModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async doesUsernameAndEmailExist(session: neo4j.Session, email: string, username: string): Promise<DoesUsernameAndEmailExist> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.DoesUsernameAndEmailExist)}`);
        const result = await session.run(query.data, { email, username });
        if (result.records.length > 0) {
            const viewModel = new DoesUsernameAndEmailExist();
            viewModel.emailExist = result.records[0].get('emailExist');
            viewModel.usernameExist = result.records[0].get('usernameExist');
            return viewModel;
        } else {
            return null;
        }
    }

    public async getUser(session: neo4j.Session, emailOrUsername: string): Promise<UserModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.GetUser)}`);
        const result = await session.run(query.data, { emailOrUsername });

        const user = result.records.map(x => {
            const viewModel = Database.createNodeObject(x.get('user')) as UserModel;

            viewModel.shippingAddresses = Database.createNodeObjectArray(x.get('shippingAddress'));

            const countries = Database.createNodeObjectArray(x.get('shippingCountry'));
            for (let i = 0; i < viewModel.shippingAddresses.length; i++) {
                viewModel.shippingAddresses[i].country = ShippingCountries.find(y => y.id === countries[i].id);
            }

            return viewModel;
        });

        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async getUserById(session: neo4j.Session, userId: number): Promise<UserModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.GetUserById)}`);
        const result = await session.run(query.data, { userId });

        const user = result.records.map(x => {
            const viewModel = Database.createNodeObject(x.get('user')) as UserModel;

            viewModel.shippingAddresses = Database.createNodeObjectArray(x.get('shippingAddress'));

            const countries = Database.createNodeObjectArray(x.get('shippingCountry'));
            for (let i = 0; i < viewModel.shippingAddresses.length; i++) {
                viewModel.shippingAddresses[i].country = ShippingCountries.find(y => y.id === countries[i].id);
            }

            return viewModel;
        });

        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async forgotPassword(session: neo4j.Session, email: string, code: string): Promise<UserModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.AddForgottenPasswordCode)}`);
        const result = await session.run(query.data, { email, code });

        const user = result.records.map(x => Database.createNodeObject(x.get('user'))) as UserModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async changeForgottenPassword(session: neo4j.Session, email: string, code: string, password: string, passwordSalt: string): Promise<UserModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.ChangeForgottenPassword)}`);
        const result = await session.run(query.data, { email, code, password, passwordSalt });

        const user = result.records.map(x => Database.createNodeObject(x.get('user'))) as UserModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async createNewsletterMember(session: neo4j.Session, viewModel: NewsletterMemberViewModel): Promise<boolean> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.CreateNewsletterMember)}`);
        const result = await session.run(query.data, { email: viewModel.email });

        if (result.records) {
            return true;
        } else {
            return false;
        }
    }

    public async deleteNewsletterMember(session: neo4j.Session, viewModel: NewsletterMemberViewModel): Promise<boolean> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.DeleteNewsletterMember)}`);
        const result = await session.run(query.data, { email: viewModel.email });

        if (result.records) {
            return true;
        } else {
            return false;
        }
    }

    public async verifyEmail(session: neo4j.Session, userId: number, code: string): Promise<boolean> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.VerifyEmail)}`);
        const result = await session.run(query.data, { userId, code });

        if (result.records.length > 0) {
            return result.records[0].get('userExist');
        } else {
            return null;
        }
    }

    public async updateAvatar(session: neo4j.Session, userId: number, avatarUrl: string): Promise<UserModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.UpdateAvatar)}`);
        const result = await session.run(query.data, { userId, avatarUrl });

        const user = result.records.map(x => Database.createNodeObject(x.get('user'))) as UserModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async updateBio(session: neo4j.Session, userId: number, bio: string): Promise<UserModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.UpdateBio)}`);
        const result = await session.run(query.data, { userId, bio });

        const user = result.records.map(x => Database.createNodeObject(x.get('user'))) as UserModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async updatePassword(session: neo4j.Session, userId: number, password: string, passwordSalt: string): Promise<UserModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.UpdatePassword)}`);
        const result = await session.run(query.data, { userId, password, passwordSalt });

        const user = result.records.map(x => Database.createNodeObject(x.get('user'))) as UserModel[];
        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async deleteUser(session: neo4j.Session, userId: number): Promise<boolean> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.DeleteUser)}`);
        const result = await session.run(query.data, { userId });

        if (result.records) {
            return true;
        } else {
            return false;
        }
    }

    public async completedTutorial(session: neo4j.Session, userId: number, viewModel: CompletedTutorial): Promise<boolean> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.CompletedTutorial)}`);
        const result = await session.run(query.data, { userId, tutorialType: viewModel.tutorialType, didSkip: viewModel.didSkip });

        if (result.records) {
            return true;
        } else {
            return false;
        }
    }

    public async getPublicUser(session: neo4j.Session, userId: number): Promise<UserViewModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.GetPublicUser)}`);
        const result = await session.run(query.data, { userId });

        const user = result.records.map(x => {
            const viewModel = new UserViewModel();

            viewModel.user = Database.createNodeObject(x.get('user'));
            viewModel.campaigns = Database.createNodeObjectArray(x.get('campaigns'));
            viewModel.products = Database.createNodeObjectArray(x.get('products'));

            return viewModel;
        });

        if (user !== null && user.length > 0) {
            return user[0];
        } else {
            return null;
        }
    }

    public async createShippingAddress(session: neo4j.Session, userId: number, viewModel: ShippingAddressModel): Promise<ShippingAddressModel> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.CreateShippingAddress)}`);
        const result = await session.run(query.data, {
            userId,
            uId: viewModel.uId,
            recipientName: viewModel.recipientName,
            contactNumber: viewModel.contactNumber,
            streetAddress: viewModel.streetAddress,
            addressLine2: viewModel.addressLine2,
            city: viewModel.city,
            postalCode: viewModel.postalCode,
            country: viewModel.country
        });

        const address = result.records.map(x => Database.createNodeObject(x.get('shippingAddress'))) as ShippingAddressModel[];
        if (address !== null && address.length > 0) {
            return address[0];
        } else {
            return null;
        }
    }

    public async deleteShippingAddress(session: neo4j.Session, userId: number, uId: string): Promise<boolean> {
        const query = require(`../../core/database/queries/${this.getQueryPath(Folder.Users, Users.DeleteShippingAddress)}`);
        const result = await session.run(query.data, { userId, uId });

        if (result.records) {
            return true;
        } else {
            return false;
        }
    }
}
