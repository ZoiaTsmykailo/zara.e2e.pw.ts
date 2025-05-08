import { Browser, BrowserContext, Page} from '@playwright/test';
import { BasePage } from '../../app/ui/pages/BasePage';
import { CookieModal } from '../../app/ui/modals/cookie-modal/CookieModal';

export async function compareCookiesAfterConsent (browser: Browser, page: Page){
    const contextAccept = await browser.newContext();
    const pageAccept = await contextAccept.newPage();
    const basePage = new BasePage(pageAccept);
    await basePage.goTo();
    const cookieModal = new CookieModal(pageAccept);
    await cookieModal.acceptCookies(); 
    const cookiesAfterAccept = await contextAccept.cookies();
    const lengthAcceptedCookies = cookiesAfterAccept.length;
   // await pageAccept.close();

    const contextReject = await browser.newContext();
    const pageReject = await contextReject.newPage();
    const basePageReject = new BasePage(pageReject);
    await basePageReject.goTo();
    const cookieModalReject = new CookieModal(pageReject);
    await cookieModalReject.rejectCookies();
    const cookiesAfterReject = await contextReject.cookies();
    const lengthRejectedCookies = cookiesAfterReject.length;
   // await pageReject.close();
    return {lengthAcceptedCookies,lengthRejectedCookies}
}