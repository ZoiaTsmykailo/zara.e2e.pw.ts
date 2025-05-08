import { test as base, BrowserContext, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { CookieModal } from '../modals/cookie-modal/CookieModal';
import { BasePage } from '../pages/BasePage';
import {promises} from 'fs';

const storageCookiePath = '.auth/cookieAccepted.json';
type MyFixture = {
    contextWithCookies: BrowserContext;
    pageWithCookies: Page;
}

export const test = base.extend<MyFixture>({
    contextWithCookies: async ({browser}, use) => {

        if(!fs.existsSync(storageCookiePath)) {
            
            const context = await browser.newContext();
            const page = await context.newPage();
            const basePage = new BasePage(page);
            await basePage.goTo()
           
            const cookieModal = new CookieModal(page);
           
            const responsePromise = page.waitForResponse(RegExp('/consentreceipts'));
            await cookieModal.acceptCookies();
            const result = await responsePromise;
            const cookies = await context.cookies();
            await promises.writeFile('.auth/cookieAccepted.json', JSON.stringify(cookies));

            await use(context);
            await context.close();
        }
    },
    pageWithCookies: async ({ page,context }, use) => {
        const cookieBuffer = await promises.readFile('.auth/cookieAccepted.json');
        const cookies = JSON.parse(cookieBuffer.toString());
        await context.addCookies(cookies);
        await use(page);
       
     },

});
export {expect} from '@playwright/test';