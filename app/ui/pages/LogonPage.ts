import {Locator, Page} from '@playwright/test';
import { BasePage } from './BasePage';
export class LogonPage extends BasePage {
    public logonTitleLocator: Locator;
    public logonRegistrationButtonLocator: Locator;
    private emailErrorLocator: Locator;
    private emailInputLocator: Locator;
    private passwordInputLocator: Locator;
    private firstNameInputLocator: Locator;
    private lastNameInputLocator: Locator;
    public signUpSubmitButtonLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.logonTitleLocator = page.locator('.enhanced-oauth-logon-view__title');
        this.logonRegistrationButtonLocator = page.locator('button[data-qa-id="logon-view-alternate-button"]');
        this.emailErrorLocator = page.locator('//div[contains(@class, "form__column")]//div[contains(@class, "form-input-error")]');
        this.emailInputLocator = page.locator('input[data-qa-input-qualifier="email"]');
        this.passwordInputLocator = page.locator('input[data-qa-input-qualifier="password"]');
        this.firstNameInputLocator = page.locator('input[data-qa-input-qualifier="firstName"]');
        this.lastNameInputLocator = page.locator('input[data-qa-input-qualifier="lastName"]');
        this.signUpSubmitButtonLocator = page.locator('button[data-qa-action="sign-up-submit"]');
        
    }
    async getErrorForInputByInputQualifier(placeholder: string) {
        const errorLocator =  this.page.locator(`.zds-input-base:has([data-qa-input-qualifier="${placeholder}"]) .form-input-error`);
        return errorLocator;
    };
    async fillRegistrationForm(email:string, password:string, firstName:string, lastName:string) {
        await this.emailInputLocator.click();
        await this.emailInputLocator.fill(email);
        await this.passwordInputLocator.click();
        await this.passwordInputLocator.fill(password);
        await this.firstNameInputLocator.click();
        await this.firstNameInputLocator.fill(firstName);
        await this.lastNameInputLocator.click();
        await this.lastNameInputLocator.fill(lastName);
    };
};