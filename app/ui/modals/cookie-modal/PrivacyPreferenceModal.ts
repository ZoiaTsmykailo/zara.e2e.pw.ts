import { expect, Locator, Page } from "@playwright/test";
export class PrivacyPreferenceModal {
  private page: Page;
  private switchHandler: Locator;
  private necessaryCookies: Locator;
  private analysisCookies: Locator;
  private analysisSwitch: Locator;
  private analysisStatus: Locator;
  private advertisingCookies: Locator;
  private advertisingSwitch: Locator;
  private advertisingStatus: Locator;
  private confirmMyChoicesButton: Locator;
  private rejectCookiesButton: Locator;
  private modal: Locator;
  constructor(page: Page) {
    this.page = page;
    this.necessaryCookies = page.locator("#ot-header-id-C0001");
    this.analysisCookies = page.locator("#ot-header-id-C0002");
    this.analysisSwitch = page.locator(
      'label.ot-switch[for="ot-group-id-C0002"] .ot-switch-nob'
    );
    this.analysisStatus = page.locator(
      'label.ot-switch[for="ot-group-id-C0002"] + span.ot-label-status'
    );
    this.advertisingCookies = page.locator("#ot-header-id-C0003");
    this.advertisingSwitch = page.locator(
      'label.ot-switch[for="ot-group-id-C0003"] .ot-switch-nob'
    );
    this.advertisingStatus = page.locator(
      'label.ot-switch[for="ot-group-id-C0003"] + span.ot-label-status'
    );
    this.confirmMyChoicesButton = page.locator(
      "button.save-preference-btn-handler.onetrust-close-btn-handler"
    );
    this.rejectCookiesButton = page.locator("button.ot-pc-refuse-all-handler");
    this.modal = page.locator('[id^="onetrust-banner-sdk"]');
  }

  async openNecessaryCookiesSection() {
    await this.necessaryCookies.click();
  }

  async toggleAnalysisCookies() {
    await this.analysisCookies.click();
    await this.analysisSwitch.click();
  }

  async toggleAdvertisingCookies() {
    await this.advertisingCookies.click();
    await this.advertisingSwitch.click();
  }
  async confirmMyChoices() {
    await this.confirmMyChoicesButton.click();
    await this.modal.waitFor({ state: "hidden" });
  }
  async rejectCookies() {
    await this.rejectCookiesButton.click();
    await this.modal.waitFor({ state: "hidden" });
  }
}
