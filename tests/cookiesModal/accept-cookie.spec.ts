import { expect, test } from "@playwright/test";
import { CookieModal } from "../../app/ui/modals/cookie-modal/CookieModal";

test.describe("Cookie modal tests on Zara.com", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASEURL!);
  });

  test("User accepts all cookies", async ({ page }) => {
    const cookieModal = new CookieModal(page);
    await cookieModal.acceptCookies();
    await expect(cookieModal.modal).toBeHidden();
    await page.close();
  });
});
