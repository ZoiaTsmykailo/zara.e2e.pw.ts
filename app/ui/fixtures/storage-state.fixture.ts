import { test as base, BrowserContext, Page } from "@playwright/test";
import fs from "fs";
import { CookieModal } from "../modals/cookie-modal/CookieModal";
import { PageManager } from "../pages/PageManager";

type MyFixture = {
  contextWithCookies: BrowserContext;
  pages: PageManager;
};

export const test = base.extend<MyFixture>({
  context: async ({ browser }, use) => {
    const storageCookiePath = ".auth/cookieAccepted.json";
    if (!fs.existsSync(storageCookiePath)) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(process.env.BASEURL!);
      const cookieModal = new CookieModal(page);
      const responsePromise = page.waitForResponse(RegExp("/consentreceipts"));
      await cookieModal.acceptCookies();
      await context.storageState({ path: storageCookiePath });
    }
    const context = await browser.newContext({
      storageState: storageCookiePath,
    });
    await use(context);
    await context.close();
  },
  pages: async ({ context }, use) => {
    const page = await context.newPage();
    const pages = new PageManager(page);
    await use(pages);
  },
});
export { expect, Page } from "@playwright/test";
