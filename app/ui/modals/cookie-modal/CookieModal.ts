import { Locator, Page } from "@playwright/test";
export class CookieModal {
  private page: Page;
  private acceptButton: Locator;
  private rejectButton: Locator;
  readonly modal: Locator;
  private settingsButton: Locator;
  private privacyTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptButton = page.locator('button:has-text("Accept All Cookies")');
    this.rejectButton = page.locator("button#onetrust-reject-all-handler");
    this.settingsButton = page.locator('button:has-text("Cookies Settings")');
    this.privacyTitle = page.locator("#ot-pc-title");
    this.modal = page.locator('[id^="onetrust-banner-sdk"]');
  }

  async acceptCookies() {
    await this.acceptButton.click();
    await this.modal.waitFor({ state: "hidden" });
  }

  async rejectCookies() {
    await this.rejectButton.click();
    await this.modal.waitFor({ state: "hidden" });
  }

  async settingsCookies() {
    await this.settingsButton.click();
  }
}
