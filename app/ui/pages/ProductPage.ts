import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private addToCartLocator: Locator;
  public productClickLocator: Locator;
  private sizeButtonsLocators: Locator;
  private closeModalLocator: Locator;
  private basketLinkLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartLocator = page.locator(
      'button[data-qa-action="add-to-cart"]'
    );
    this.productClickLocator = page.locator(
      'a[data-qa-action="product-click"]'
    );
    this.sizeButtonsLocators = page.locator(
      "li.size-selector-sizes-size--enabled button"
    );
    this.closeModalLocator = page.getByRole("button", { name: "Close" });
    this.basketLinkLocator = page.getByRole("link", {
      name: `Products in basket`,
    });
  }

  async getFirstProduct() {
    await this.productClickLocator.first().click();
  }

  async getCountOfProducts() {
    await this.page.waitForTimeout(2000);
    const products = this.productClickLocator;
    await products.first().isVisible();
    const countProduct = await products.count();
    return countProduct;
  }

  async addAllSizesOfProduct(countProduct: number) {
    for (let p = 0; p < countProduct; p++) {
      await this.productClickLocator.nth(p).click();
      const addButton = this.addToCartLocator;
      await addButton.waitFor({ state: "visible" });
      await addButton.click();
      const sizeButtons = this.sizeButtonsLocators;
      const filteredSizes = sizeButtons
        .filter({
          hasNot: this.page.locator("span", { hasText: "Coming soon" }),
        })
        .filter({
          hasNot: this.page.locator("span", { hasText: "View similar" }),
        });
      const sizeCount = await filteredSizes.count();
      if (sizeCount > 3) {
        for (let i = 0; i < sizeCount; i++) {
          await this.sizeButtonsLocators.nth(i).waitFor({ state: "visible" });
          await this.sizeButtonsLocators.nth(i).click();
          await this.closeModalLocator.waitFor({
            state: "visible",
            timeout: 2000,
          });
          await this.closeModalLocator.click();
          await this.addToCartLocator.waitFor({
            state: "visible",
            timeout: 2000,
          });
          await this.addToCartLocator.click();
        }
        return sizeCount;
      } else {
        await this.page.goBack();
        await this.productClickLocator.first().waitFor();
      }
    }
  }

  async clickBasketLink() {
    await this.basketLinkLocator.click();
    await expect(this.page.locator("li.shop-cart-item").first()).toBeVisible({
      timeout: 5000,
    });
  }
}
