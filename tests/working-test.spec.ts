import { test, expect, Page } from "@playwright/test";

test("zara add all sizes to the basket when product has more then 3 availeble sizes ", async ({
  page,
}) => {
  await page.goto("https://www.zara.com/ua/en");
  await page.locator("button#onetrust-reject-all-handler").click();

  await page.getByRole("link", { name: /Search/i }).click();
  const searchBox = page.locator(
    'input[placeholder="What are you looking for?"]'
  );
  await searchBox.fill("джинси");
  await page.keyboard.press("Enter");
  // умова для перебору усіх продуктів у яких мінімум є 4 розміри
  await page
    .locator(
      'a[data-qa-action="product-click"] [data-qa-qualifier="media-image"]'
    )
    .first()
    .isVisible();
  await page.waitForTimeout(2000);
  const products = page.locator('a[data-qa-action="product-click"]');
  const countProduct = await products.count();
  console.log(countProduct);
  for (let p = 0; p < countProduct; p++) {
    await page.locator('a[data-qa-action="product-click"]').nth(p).click();
    const addButton = page.locator('button[data-qa-action="add-to-cart"]');
    await addButton.waitFor({ state: "visible" });
    await addButton.click();
    const sizeButtons = page.locator(
      "li.size-selector-sizes-size--enabled button"
    );
    const sizeCount = await sizeButtons.count();
    console.log(`Доступних розмірів: ${sizeCount}`);
    if (sizeCount > 3) {
      console.log(`We are in the if . Sizes count :${sizeCount}`);
      for (let i = 0; i < sizeCount; i++) {
        await page
          .locator("li.size-selector-sizes-size--enabled button")
          .nth(i)
          .click();
        await page.getByRole("button", { name: "Close" }).click();
        await expect(
          page.locator(
            'span[data-qa-id="layout-header-go-to-cart-items-count"]'
          )
        ).toHaveText(`${i + 1}`);

        await page.locator('button[data-qa-action="add-to-cart"]').click();
      }
      await expect(
        page.getByRole("link", { name: `Products in basket: ${sizeCount}` })
      ).toBeVisible();
    }
    //перехід в корзину
    await page
      .getByRole("link", { name: `Products in basket: ${sizeCount}` })
      .click();
    await page.pause();
    await expect(page.locator("li.shop-cart-item").first()).toBeVisible({
      timeout: 10000,
    });
    const listProductInCart = page.locator("li.shop-cart-item");
    const countProductsInCart = await listProductInCart.count();
    console.log(`Товарів у кошику: ${countProductsInCart}`);
    // Видаляємо кожен другий товар, починаючи з останнього
    for (let i = countProductsInCart - 1; i >= 0; i--) {
      if (i % 2 !== 0) {
        console.log(`Видалення товару з індексом: ${i}`);
        await page
          .locator('div[data-qa-id="remove-order-item-unit"]')
          .nth(i)
          .click();
        await page.waitForTimeout(1000);
      }
    }
    break;
  }

  //await page.close();
  //спроба оформлення замовлення
  await page.locator('button[data-qa-id="shop-continue"]').click();
  await page
    .locator(".enhanced-oauth-logon-view__title")
    .waitFor({ state: "visible" });
  await page
    .locator('button[data-qa-id="logon-view-alternate-button"]')
    .waitFor({ state: "visible" });
  // register with incorrect data
  // Переходимо до реєстрації
  await page
    .locator('button[data-qa-id="logon-view-alternate-button"]')
    .click();
  const emailError = page.locator(
    '//div[contains(@class, "form__column")]//div[contains(@class, "form-input-error")]'
  );
  const passwordError = page.locator(".form-input-error").filter({
    hasText:
      "Enter a secure password: At least 8 characters long, containing uppercase and lowercase letters and numbers",
  });

  await page
    .locator('input[data-qa-input-qualifier="email"]')
    .fill("123testttt;jihi");
  await page.locator('input[data-qa-input-qualifier="password"]').click();
  await expect(emailError).toContainText("Enter a valid email address");

  // Вводимо некоректний пароль (наприклад, лише цифри)
  await page
    .locator('input[data-qa-input-qualifier="password"]')
    .fill("11111111");
  await page.locator('input[data-qa-input-qualifier="firstName"]').click();
  await expect(passwordError).toBeVisible();
  // Ім’я та прізвище залишаємо пустими
  await page.locator('input[data-qa-input-qualifier="firstName"]').fill(""); // empty string
  await page.locator('input[data-qa-input-qualifier="lastName"]').fill(""); // empty string
  await page.locator('button[data-qa-action="sign-up-submit"]').click();

  // Очікуємо на Required field errors
  await expect(
    page.locator(
      '.zds-input-base:has([data-qa-input-qualifier="firstName"]) .form-input-error'
    )
  ).toContainText("Required field.");
  await expect(
    page.locator(
      '.zds-input-base:has([data-qa-input-qualifier="lastName"]) .form-input-error'
    )
  ).toContainText("Required field.");
  await page.close();
});

//функція для перевірки помилок при пустих полях обовязкових
function getErrorForInputByInputQualifier(page: Page, placeholder: string) {
  return page.locator(
    `.zds-input-base:has([data-qa-input-qualifier="${placeholder}"]) .form-input-error'`
  );
}
