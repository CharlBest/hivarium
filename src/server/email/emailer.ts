import sgMail = require('@sendgrid/mail');
import { MailData } from '@sendgrid/helpers/classes/mail';
import { environment } from '../environments/environment';

sgMail.setApiKey(environment.sendGrid.apiKey);
sgMail.setSubstitutionWrappers('{{', '}}');

export class Emailer {
    static fromEmail = 'admin@hivarium.com';
    static fromName = 'Hivarium';

    static welcomeEmail(email: string, username: string, emailVerifyCode: string) {
        const data: MailData = {
            to: {
                email,
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Welcome',
            templateId: environment.sendGrid.templates.welcome,
            substitutions: {
                username,
                emailVerifyCode
            }
        };

        Emailer.send(data);
    }

    static forgotPasswordEmail(email: string, forgotPasswordCode: string) {
        const data: MailData = {
            to: {
                email,
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Forgot Password',
            templateId: environment.sendGrid.templates.forgotPassword,
            substitutions: {
                email,
                forgotPasswordCode
            }
        };

        Emailer.send(data);
    }

    static feedbackEmail(feedbackContent: string) {
        const data: MailData = {
            to: {
                email: 'feedback@hivarium.com',
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Feedback',
            templateId: environment.sendGrid.templates.feedback,
            substitutions: {
                feedbackContent
            }
        };

        Emailer.send(data);
    }

    static resendEmailVerificationLinkEmail(email: string, emailVerifyCode: string) {
        const data: MailData = {
            to: {
                email,
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Email verification',
            templateId: environment.sendGrid.templates.resendEmailVerificationLink,
            substitutions: {
                emailVerifyCode
            }
        };

        Emailer.send(data);
    }

    static boughtProductSuccessEmail(email: string, productTitle: string) {
        const data: MailData = {
            to: {
                email,
                name: Emailer.fromName
            },
            from: Emailer.fromEmail,
            subject: 'Product bought',
            templateId: environment.sendGrid.templates.boughtProductSuccess,
            substitutions: {
                productTitle
            }
        };

        Emailer.send(data);
    }

    static send(data: MailData) {
        if (!environment.production) {
            data.mailSettings = {
                sandboxMode: {
                    enable: true
                }
            };
        }

        sgMail.send(data, null, (err, res) => {
            if (err) {
                // TODO: save against profile that email failed to send (maybe)
            }
        });
    }
}
