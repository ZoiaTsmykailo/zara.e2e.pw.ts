import {Locator, Page} from '@playwright/test';
export class BasePage {
   protected page: Page;
   protected goToStoreLocator: Locator;
   
    constructor(page: Page){
        this.page = page;
        this.goToStoreLocator = page.locator('button[data-qa-action="go-to-store"]');
    }
    async goTo () {
        await this.page.goto(process.env.BASEURL!);
    }
};