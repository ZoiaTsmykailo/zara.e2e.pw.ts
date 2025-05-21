import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BasketPage extends BasePage {
  private removeUnitButtonLocator: Locator;
  private productListInBasketLocator: Locator;
  buttonContinueLocator: Locator;
  constructor(page: Page) {
    super(page);
    this.removeUnitButtonLocator = page.locator(
      'div[data-qa-id="remove-order-item-unit"]'
    );
    this.productListInBasketLocator = page.locator("li.shop-cart-item");
    this.buttonContinueLocator = page.locator(
      'button[data-qa-id="shop-continue"]'
    );
  }
  async deleteEverySecondSizeInBasket(countProductsInCart: number) {
    for (let i = countProductsInCart - 1; i >= 0; i--) {
      if (i % 2 !== 0) {
        await this.removeUnitButtonLocator.nth(i).click();
        await this.page.waitForTimeout(1000);
      }
    }
  }
  async getCountOfProductsInBasket() {
    await this.productListInBasketLocator.nth(1).isVisible();
    const listProductInCart = this.productListInBasketLocator;
    const countProductsInCart = await listProductInCart.count();
    return countProductsInCart;
  }
}
