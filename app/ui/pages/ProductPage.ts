import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private addToCartLocator: Locator;
    constructor(page: Page) {
        super(page);
        this.addToCartLocator = page.locator('button[data-qa-action="add-to-cart"]');
    }
    
    async getFirstProduct() {
      await this.page.locator('a[data-qa-action="product-click"]').first().click();
    }

    async getAvailableSizes() {
      await this.addToCartLocator.click();
      const sizeButtons = this.page.locator('button[data-qa-action="size-in-stock"]');
  
      const result =  await sizeButtons.evaluateAll(buttons =>
        buttons.map(btn => ({
          text: btn.textContent?.trim() || '',
          qualifier: btn.getAttribute('data-qa-qualifier') || '',
        }))

       
      );
      return result;
    };

    async addToBasketAllAvailableSizesProduct () {
     
      const availableSizes = await this.getAvailableSizes();
      console.log(availableSizes);
      console.log(availableSizes.length);
      if(availableSizes.length>3){

         for (const sizeElement of availableSizes){
        
          const sizeText = sizeElement.text;
      // const sizeButton =  page.getByRole('button', { name: sizeText, exact: true });
        
           const sizeButton = this.page.locator('button.size-selector-sizes-size__button').filter({
             has: this.page.locator('div.size-selector-sizes-size__label'),
             hasText: new RegExp(`^${sizeText}$`)
            });
        
           await sizeButton.click();
          // await this.page.getByRole('button', { name: 'close' }).click();
          await this.closeSizeModal(); 
          await this.page.locator(`span span:has-text("ADD")`).click();
        
      }
       availableSizes.forEach((item, index) => {
      console.log(`Індекс: ${index}, значення:`, item);
       });
      }
    }



    async getProducts() {
      const products = this.page.locator('a[data-qa-action="product-click"]');
      const count = await products.count();
      
      for (let i = 0; i < count; i++) {
       const product = products.nth(i);

         await product.click();
         await this.addToCartLocator.click();
        
          const countSizeLocator = this.page.locator('div[data-qa-qualifier="size-selector-sizes-size-label"]');
          const sizes = this.page.locator('size-selector-sizes-size__action size-selector-sizes-size__element');
          
          const countSize = await  countSizeLocator.count();
          const viewSimilar = sizes.locator('span:text("View similar")');
          const viewSimilarCount =await viewSimilar.count();
          console.log(countSize);
          if (countSize>3  && countSize-viewSimilarCount > 4){
              for (let i = 1; i < countSize+1; i++){
                  const size = countSizeLocator.nth(i);

                  await size.click();
                  
                  // const closeModal = this.page.locator('button[aria-label="close"]');
                  
                  //await closeModal.click();   
                  await this.closeSizeModal();                
                  
                  await this.addToCartLocator.click();
                  
               }
               
            break;
              } 
          else   await this.page.goBack(); 
       
      }
    
    }
  
  async addSizeToCart(sizeLocator: Locator) {
      const addBtn = this.addToCartLocator;
  
      await sizeLocator.click();
      await this.closeSizeModal();
      await addBtn.waitFor({ state: 'visible' });
      await addBtn.click(); 
  };
  
  async closeSizeModal() {
      const closeBtn = this.page.getByRole('button', { name: 'close' });
      await closeBtn.waitFor({ state: 'visible' });
      await closeBtn.click();
  };

  }