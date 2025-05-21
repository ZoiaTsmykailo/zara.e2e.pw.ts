import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class SearchResultPage extends BasePage {
  private searchLocator: Locator;
  private inputSearchLocator: Locator;
  private womanCheckLocator: Locator;
  private manCheckLocator: Locator;
  private kidsCheckLocator: Locator;
  private productClickLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.searchLocator = page.getByRole("link", { name: "Search" });
    this.productClickLocator = page.locator(
      'a[data-qa-action="product-click"]'
    );
    this.inputSearchLocator = page.locator(
      'input[placeholder="What are you looking for?"]'
    );
    this.womanCheckLocator = page.getByRole("button", {
      name: "Woman",
      exact: true,
    });
    this.manCheckLocator = page.getByRole("button", {
      name: "Man",
      exact: true,
    });
    this.kidsCheckLocator = page.getByRole("button", {
      name: "Kids",
      exact: true,
    });
  }

  async goToStore() {
    await this.goToStoreLocator.click();
  }
  async clickSearch() {
    await this.searchLocator.waitFor({ state: "visible" });
    await this.searchLocator.click();
  }
  async choseManForSearch() {
    await this.manCheckLocator.click();
    await this.productClickLocator.first().waitFor({ state: "visible" });
  }
  async choseWomanForSearch() {
    await this.womanCheckLocator.click();
    await this.productClickLocator.first().waitFor({ state: "visible" });
  }
  async choseKidsForSearch() {
    await this.kidsCheckLocator.click();
    await this.productClickLocator.first().waitFor({ state: "visible" });
  }
  async findProduct(product: string) {
    await this.inputSearchLocator.waitFor({ state: "visible" });
    await this.inputSearchLocator.click();
    await this.inputSearchLocator.fill(product);
    await this.inputSearchLocator.press("Enter");
  }
}
