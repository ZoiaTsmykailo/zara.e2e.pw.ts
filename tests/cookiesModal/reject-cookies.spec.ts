import {expect, test } from '@playwright/test';
import { BasePage } from '../../app/ui/pages/BasePage';
import { CookieModal } from '../../app/ui/modals/cookie-modal/CookieModal';
import { compareCookiesAfterConsent } from './helper-cookies';

test.describe('Cookie modal reject test on Zara', () => {

    test.beforeEach(async ({page}) => {
        const basePage = new BasePage(page);
        await basePage.goTo();
    });

    test('User rejects all cookies', async ({page}) => {
        const cookieModal = new CookieModal(page);
        await cookieModal.rejectCookies();
        await expect(cookieModal.modal).toBeHidden();
    });

    test('Count rejected cookies', async ({page, context}) => {
        const cookieModal = new CookieModal(page);
        await cookieModal.rejectCookies();
        const cookies = await context.cookies();
        const lengthCookies = cookies.length;
        console.log(lengthCookies);
         expect(lengthCookies).toBeLessThan(18);
    });
});
test('Compare accepted and rejected count - rejected cookies should be less then accepted cookies' , async ({page,browser}) => {
  const cookieContext = await compareCookiesAfterConsent(browser,page);
  console.log(cookieContext.lengthAcceptedCookies);
  console.log(cookieContext.lengthRejectedCookies);
  
  expect(cookieContext.lengthRejectedCookies).toBeLessThan(cookieContext.lengthAcceptedCookies);

});